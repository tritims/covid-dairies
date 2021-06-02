import datetime
import os
import random
import re
import string
from datetime import datetime
from functools import wraps
from urllib.request import Request, urlopen as uOpen

import pymongo
import requests
from bs4 import BeautifulSoup as bs
from bson.objectid import ObjectId
from flask import Flask, request, jsonify, json, _request_ctx_stack
from flask_cors import CORS
from jose import jwt

from covid_diaries_nlp import CovidDiariesNLP
from textFragmenter import TxtFragmenter
from utilityFunctions import cleanTitle

app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SECRET_KEY"] = f'INSECURE_DEV_SECRET_KEY_REPLACE_STATICALLY_IN_PROD_'.join(
    random.choices(string.ascii_uppercase + string.digits, k=10))


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


app.json_encoder = JSONEncoder

# initialize database
try:
    dbConn = pymongo.MongoClient(
        "mongodb+srv://Abhishek:Satyam03@covid-diaries-cluster.mwtcw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    dbConn.server_info()
    db = dbConn['CovidDiaries']
    storyCollection = db['Stories']
    userCollection = db['users']
    print("DateBase Connected !!!")
except Exception as e:
    print(f'An Error in Database : {e}')


# scraper from slate
@app.route('/api/v1/slate', methods=['GET'])
def slate():
    # base url of corana virus tag and iterating through each page
    # print(parser.parse('2021-04-30T14:34:29+00:00'))
    allNewsLinks = []
    for i in [1, 2, 3, 4, 5]:
        newsUrl = f"https://slate.com/tag/coronavirus-diaries/{i}"
        req = Request(newsUrl, headers={'User-Agent': 'Mozilla/5.0'})
        newsPage = uOpen(req).read()
        newsPageHtml = bs(newsPage, "html.parser")
        eachNews = newsPageHtml.findAll("a", {"class": "topic-story"})

        for i in eachNews:
            tempLink = i['href']
            if tempLink not in allNewsLinks:
                allNewsLinks.append(tempLink)

    allStoryLinksInDB = []

    try:
        allStory = storyCollection.find({}, {"link": 1, "_id": 0})
        for i in allStory:
            if 'link' in i:
                allStoryLinksInDB.append(i['link'])
    except Exception as e:
        return f"link fetching error : {str(e)}", 400

    saveCount = 0
    passCount = 0

    for i in allNewsLinks:
        link = i
        if link in allStoryLinksInDB:
            print(f"pass {passCount}")
            passCount += 1
            pass
        else:
            try:
                req = requests.get(link)
                req.encoding = 'utf-8'
                singleNewsPageHtml = bs(req.text, "html.parser")
                heading = singleNewsPageHtml.find("h1",
                                                  {"article__hed"}).text
                contentHTML = singleNewsPageHtml.find_all(
                    "p", {"class": "slate-paragraph slate-graf"})  # get list of p tag
                contentText = ''
                for i in range(1, len(contentHTML) - 1):
                    contentText = contentText + contentHTML[i].text
                author = singleNewsPageHtml.find(
                    'div', {"class": "article__byline"}).text.replace("\n", "").replace("By", "").strip()
                date = singleNewsPageHtml.find(
                    'time', {"class": "article__dateline"})['content']

                cvnlp = CovidDiariesNLP()
                dataTags = cvnlp.getNLPInfo(text=contentText)
                tf = TxtFragmenter()
                paras = tf.cleanAndFragment(text=contentText)
                data = {
                    'title': cleanTitle(heading),
                    'content': paras,
                    'link': link,
                    'source': "SLATE.COM",
                    'dateTime': datetime.strptime(date[:10], "%Y-%m-%d"),
                    'keywords': dataTags['keywords'],
                    'cities': dataTags['cities'],
                    'abusive': dataTags['abusive'],
                    'emotions': dataTags['emotions'],
                    'author': author,
                    'coverage': 'global',
                    'language': "en"
                }
                storyCollection.insert_one(data)
                print(f"Saved {saveCount} succesfully")
                saveCount += 1
            except Exception as e:
                return f"An Error Occured: {e}", 400
    return jsonify({"success": True}), 200


# adding story(using scheduler)
@app.route('/api/v1/toi', methods=['GET'])
def toi():
    searchString = 'my-covid-story'  # can have list of keywords
    # searchString = request.json['content']   #if we want to search custom string via front end

    newsUrl = "https://timesofindia.indiatimes.com/life-style/health-fitness/" + \
              searchString.strip()
    req = Request(newsUrl, headers={'User-Agent': 'Mozilla/5.0'})
    newsPage = uOpen(req).read()
    newsPageHtml = bs(newsPage, "html.parser")
    eachNews = newsPageHtml.findAll("span", {"class": "md_news_leftin"})
    allNewsLinks = []

    for i in eachNews:
        tempLink = i.a['href']
        if tempLink not in allNewsLinks:
            allNewsLinks.append(i.a['href'])

    # checking curated page 1 and 2
    for i in [1, 2, 3]:
        newsUrl = f"https://timesofindia.indiatimes.com/etimeslistgenric.cms?msid=2886704&query=mycoronastory&datasection=lifestyle&curpg={i}"
        req = Request(newsUrl, headers={'User-Agent': 'Mozilla/5.0'})
        newsPage = uOpen(req).read()
        newsPageHtml = bs(newsPage, "html.parser")
        eachNews = newsPageHtml.findAll("span", {"class": "md_news_left"})

        for i in eachNews:
            tempLink = i.a['href']
            if tempLink not in allNewsLinks:
                allNewsLinks.append(i.a['href'])

    allStoryLinksInDB = []

    try:
        allStory = storyCollection.find({}, {"link": 1, "_id": 0})
    except Exception as e:
        return f"link fetching error : {e}", 400

    for i in allStory:
        allStoryLinksInDB.append(i['link'])

    saveCount = 0
    passCount = 0

    for i in allNewsLinks:
        link = "https://timesofindia.indiatimes.com" + i
        if link in allStoryLinksInDB:
            print(f"pass {passCount}")
            passCount += 1
            pass
        else:
            try:
                req = requests.get(link)
                req.encoding = 'utf-8'
                singleNewsPageHtml = bs(req.text, "html.parser")
                heading = singleNewsPageHtml.find(
                    "arttitle").text
                contentHTML = singleNewsPageHtml.find(
                    "div", {"class": "Normal"})
                contentText = contentHTML.text
                garbageTextArray = ['Did you fight COVID-19?', 'We want to hear all about it.',
                                    'ETimes Lifestyle is calling all the survivors of COVID to share their stories of survival and hope.',
                                    "Write to us at toi.health1@gmail.com with 'My COVID story' in the subject lineWe will publish your experience.",
                                    "DISCLAIMERThe views expressed in this article should not be considered as a substitute for a physician's advice.",
                                    "Please consult your treating physician for more details."
                                    ]
                for i in garbageTextArray:
                    contentText = contentText.replace(i, "")
                date = singleNewsPageHtml.find('div', {"class": "as_byline"})
                Fdate = date.find('div', attrs={'dateval': True})
                rawDate = Fdate['dateval']
                cleanDate = rawDate[8:].replace(
                    "IST", "").replace(",", "").strip()
                stdDate = datetime.strptime(
                    cleanDate, '%b %d %Y %H:%M')
                contentText = contentText.replace('"', "").replace("\n", "")
                cvnlp = CovidDiariesNLP()
                dataTags = cvnlp.getNLPInfo(text=contentText)
                tf = TxtFragmenter()
                paras = tf.cleanAndFragment(text=contentText)

                data = {
                    'title': cleanTitle(heading),
                    'content': paras,
                    'link': link,
                    'source': "TOI",
                    'dateTime': stdDate,
                    'keywords': dataTags['keywords'],
                    'cities': dataTags['cities'],
                    'abusive': dataTags['abusive'],
                    'emotions': dataTags['emotions'],
                    'coverage': 'india',
                    'language': "en"
                }
                storyCollection.insert_one(data)
                print(f"Saved {saveCount} succesfully")
                saveCount += 1
            except Exception as e:
                print(f"An Error Occured: {e}")
    return ("Successfully scraped"), 200


# search string
PER_PAGE = 9


@app.route('/api/v1/', methods=['GET'])
def getStory():
    order = request.args.get('date') or 'newest'
    page = int(request.args.get('page', 1))
    coverage = request.args.get('coverage') or 'global'
    searchString = request.args.get('search')
    lang = request.args.get('language') or 'en'

    if lang == 'null':
        lang = 'en'

    if searchString:
        regex = re.compile(searchString, re.IGNORECASE)
        if coverage == 'global':
            query = {'language': lang, "$or": [{"content": {"$regex": regex}}, {"title": {"$regex": regex}}]}
        else:
            query = {'coverage': coverage,
                     'language': lang, "$or": [{"content": {"$regex": regex}}, {"title": {"$regex": regex}}]}
    else:
        if coverage == 'global':
            query = {'language': lang}
        else:
            query = {'coverage': coverage, 'language': lang}

    try:
        totalFilteredCount = storyCollection.count_documents(query)
        if order == 'newest':
            filteredStory = storyCollection.find(query,
                                                 {'title': 1, "emotions": 1, "keywords": 1, "source": 1, "link": 1,
                                                  "dateTime": 1, "cities": 1}).sort(
                [('dateTime', pymongo.DESCENDING)]).skip(PER_PAGE * (page - 1)).limit(PER_PAGE)
        else:
            filteredStory = storyCollection.find(query,
                                                 {'title': 1, "emotions": 1, "keywords": 1, "source": 1, "link": 1,
                                                  "dateTime": 1, "cities": 1}).sort(
                [('dateTime', pymongo.ASCENDING)]).skip(PER_PAGE * (page - 1)).limit(PER_PAGE)

        #  returning 9 stories per page
        resStories = [{"count": totalFilteredCount}]
        for i in filteredStory:
            resStories.append(i)
            # print(resStory)
        return jsonify(resStories), 200
        #     return jsonify({"message":"success"}),200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/v1/id=<_id>', methods=['GET'])
def story(_id):
    # id = request.args.get('id')
    if _id in (None, ''):
        return f"Article Id not found", 400
    edit = request.args.get('edit') or 0
    try:
        storyFind = storyCollection.find_one({'_id': ObjectId(_id)})

        if not storyFind:
            return f"Article not found", 404

        story = {"title": storyFind['title'],
                 "dateTime": storyFind['dateTime'],
                 'language': storyFind['language'],
                 'content': storyFind['content'],
                 'cities': [],
                 'keywords': []
                 }
        if 'source' in storyFind:
            story['source'] = storyFind['source']
        elif 'name' in storyFind:
            story['name'] = storyFind['name']
        if 'cities' in storyFind:
            story['cities'] = storyFind['cities']
        if 'keywords' in storyFind:
            story['keywords'] = storyFind['keywords']

        if edit:
            if 'age' in storyFind:
                story['age'] = storyFind['age']
            if 'gender' in storyFind:
                story['gender'] = storyFind['gender']
            if 'experienceType' in storyFind:
                story['experienceType'] = storyFind['experienceType']
            if 'duration' in storyFind:
                story['duration'] = storyFind['duration']
            if 'isCured' in storyFind:
                story['isCured'] = storyFind['isCured']
            if 'thingToRemember' in storyFind:
                story['thingToRemember'] = storyFind['thingToRemember']
            if 'thingToForget' in storyFind:
                story['thingToForget'] = storyFind['thingToForget']
            if 'symptoms' in storyFind:
                story['symptoms'] = storyFind['symptoms']

        return jsonify(story), 200

    except Exception as e:
        return f"An Error Occured: {e}"


# Put these in eviorment variable
AUTH0_DOMAIN = 'coviddiary.us.auth0.com'
API_AUDIENCE = 'https://coviddiary.us.auth0.com/api/v2/'
ALGORITHMS = ["RS256"]


def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        return {"code": "authorization_header_missing",
                "description":
                    "Authorization header is expected"}, 401

    parts = auth.split()

    if parts[0].lower() != "bearer":
        return {"code": "invalid_header",
                "description":
                    "Authorization header must start with"
                    " Bearer"}, 401
    elif len(parts) == 1:
        return {"code": "invalid_header",
                "description": "Token not found"}, 401
    elif len(parts) > 2:
        return {"code": "invalid_header",
                "description":
                    "Authorization header must be"
                    " Bearer token"}, 401

    token = parts[1]
    # print(token)
    return token


def requires_auth(f):
    """Determines if the Access Token is valid
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = uOpen("https://" + AUTH0_DOMAIN + "/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://" + AUTH0_DOMAIN + "/"
                )
            except jwt.ExpiredSignatureError:
                return {"code": "token_expired",
                        "description": "token is expired"}, 401
            except jwt.JWTClaimsError:
                return {"code": "invalid_claims",
                        "description":
                            "incorrect claims,"
                            "please check the audience and issuer"}, 401
            except Exception:
                return {"code": "invalid_header",
                        "description":
                            "Unable to parse authentication"
                            " token."}, 401

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        return {"code": "invalid_header",
                "description": "Unable to find appropriate key"}, 401

    return decorated


@app.route('/api/v1/private/dashboard', methods=['GET'])
@requires_auth
def dashboard():
    try:
        token = get_token_auth_header()
        url = "https://" + AUTH0_DOMAIN + "/userinfo"
        myHeaders = {"Authorization": f"Bearer {token}"}
        response = requests.request("GET", url, headers=myHeaders, data={})
        user = json.loads(response.text)
        # check user in database
        userInDB = userCollection.find_one({'email': user['email']})
        # print(userInDB)
        # user = {name,email,storiesId}

        if userInDB:  # if user in database return success
            stories = []
            for i in userInDB['storiesId']:
                x = storyCollection.find_one({'_id': i['_id']})
                if x:
                    obj = {"title": x['title'], "dateTime": x['dateTime'], "_id": i["_id"]}
                    stories.append(obj)

            return jsonify({
                'stories': stories,
            }), 200
        else:
            userToInsert = {"name": user['name'], "email": user['email'], "storiesId": []}
            userCollection.insert_one(userToInsert)
            return jsonify({"message": "new user created", 'stories': []
                            }), 200
    except ValueError as e:
        # Invalid token
        return {"error": "Invalid Token"}, 400


@app.route('/api/v1/private/addStory', methods=['POST'])
@requires_auth
def addStory():
    request_data = request.get_json()
    try:
        token = get_token_auth_header()
        url = "https://" + AUTH0_DOMAIN + "/userinfo"
        myHeaders = {"Authorization": f"Bearer {token}"}
        response = requests.request("GET", url, headers=myHeaders, data={})
        user = json.loads(response.text)

        errorMsg = []  # this will collect all the errors while processing form
        # {
        #     name: "xxx",
        #     age: "25",
        #     city: "xxxx",
        #     gender: "M",
        #     experienceType: "Covid Patient",
        #     symptoms: "cold, cough, fever",
        #     duration: "1 month",
        #     isCured: "Yes/No",
        #     title: "My Story",
        #     content: "My Content",
        #     thingToRemember: "xxx",
        #     thingToForget: "vvdfdf",
        #     keywords: ["sdfsdf", "dfsdfd"]
        # }
        if user:  # if user in token
            storyObj = dict()  # populating storyObj with data from frontend
            storyObj['authorEmail'] = user['email']

            storyObj['title'] = request_data['title'] if 'title' in request_data else errorMsg.append(
                {"message": "title is required"})

            storyObj['name'] = request_data['name'] if 'name' in request_data else errorMsg.append(
                {"message": "Name is required"})

            storyObj['age'] = request_data['age'] if 'age' in request_data else errorMsg.append(
                {"message": "Age is required"})

            storyObj['cities'] = [request_data['city']] if 'city' in request_data else errorMsg.append(
                {"message": "City is required"})

            storyObj['gender'] = request_data['gender'] if 'gender' in request_data else errorMsg.append(
                {"message": "Gender is required"})

            storyObj['experienceType'] = request_data[
                'experienceType'] if 'experienceType' in request_data else errorMsg.append(
                {"message": "Experience type is required"})

            storyObj['symptoms'] = request_data['symptoms'] if 'symptoms' in request_data else errorMsg.append(
                {"message": "Symptoms type is required"})

            storyObj['duration'] = request_data['duration'] if 'duration' in request_data else errorMsg.append(
                {"message": "Duration is required"})

            storyObj['isCured'] = request_data['isCured'] if 'isCured' in request_data else errorMsg.append(
                {"message": "Is cured is required"})

            storyObj['thingToRemember'] = request_data[
                'thingToRemember'] if 'thingToRemember' in request_data else errorMsg.append(
                {"message": "Thing to remember is required"})

            storyObj['thingToForget'] = request_data[
                'thingToForget'] if 'thingToForget' in request_data else errorMsg.append(
                {"message": "Thing to forget is required"})

            storyObj['dateTime'] = datetime.now()

            storyObj['keywords'] = request_data['keywords'] if 'keywords' in request_data else errorMsg.append(
                {"message": "Keywords is required"})

            storyObj['language'] = request_data['language'] if 'language' in request_data else errorMsg.append(
                {"message": "Language is required"})

            storyObj['coverage'] = 'india'

            tf = TxtFragmenter()
            if 'content' in request_data:
                paras = tf.cleanAndFragment(text=request_data['content'])
                storyObj['content'] = paras if 'content' in request_data and len(paras) > 0 else errorMsg.append(
                    {"message": "content is required"})

            if len(errorMsg) > 0:  # error after processing the formData
                return jsonify({"error": errorMsg}), 400

            if request_data['language'] == 'en':
                cvnlp = CovidDiariesNLP()
                dataTags = cvnlp.getNLPInfo(text=request_data['content'])
                if dataTags:
                    storyObj['keywords'] = list(set(storyObj['keywords'] + dataTags['keywords']))
                    storyObj['cities'] = list(set(storyObj['cities'] + dataTags['cities']))
                    storyObj['abusive'] = dataTags['abusive']
                    storyObj['emotions'] = dataTags['emotions']

            try:  # handle databases carefully
                storyCollection.insert_one(storyObj)
                _id = storyObj["_id"]
                newStoriesIdInUser = {'$addToSet': {"storiesId": {"_id": _id}}}
                userCollection.update_one({"email": user['email']}, newStoriesIdInUser)
            except Exception as exc:
                return jsonify({"message": str(exc)}), 400

            return jsonify({
                'message': "successfully submitted"}), 200


    except Exception as e:
        return {"error": str(e)}, 400


@app.route('/api/v1/private/editStory/id=<_id>', methods=['PUT'])
@requires_auth
def editStory(_id):
    request_data = request.get_json()
    if _id in (None, ''):
        return jsonify({"error": [{"message": "experience not found"}]}), 400
    try:
        token = get_token_auth_header()
        url = "https://" + AUTH0_DOMAIN + "/userinfo"
        myHeaders = {"Authorization": f"Bearer {token}"}
        response = requests.request("GET", url, headers=myHeaders, data={})
        user = json.loads(response.text)

        # find story in database
        storyFind = storyCollection.find_one({'_id': ObjectId(_id)})
        errorMsg = []  # this will collect all the errors while processing form

        if user and storyFind['authorEmail'] == user['email']:  # if user email matches with author email

            storyObj = dict()  # populating storyObj with data from frontend

            storyObj['title'] = request_data['title'] if 'title' in request_data else errorMsg.append(
                {"message": "title is required"})

            storyObj['name'] = request_data['name'] if 'name' in request_data else errorMsg.append(
                {"message": "Name is required"})

            storyObj['age'] = request_data['age'] if 'age' in request_data else errorMsg.append(
                {"message": "Age is required"})

            storyObj['cities'] = [request_data['city']] if 'city' in request_data else errorMsg.append(
                {"message": "City is required"})

            storyObj['gender'] = request_data['gender'] if 'gender' in request_data else errorMsg.append(
                {"message": "Gender is required"})

            storyObj['experienceType'] = request_data[
                'experienceType'] if 'experienceType' in request_data else errorMsg.append(
                {"message": "Experience type is required"})

            storyObj['symptoms'] = request_data['symptoms'] if 'symptoms' in request_data else errorMsg.append(
                {"message": "Symptoms type is required"})

            storyObj['duration'] = request_data['duration'] if 'duration' in request_data else errorMsg.append(
                {"message": "Duration is required"})

            storyObj['isCured'] = request_data['isCured'] if 'isCured' in request_data else errorMsg.append(
                {"message": "Is cured is required"})

            storyObj['thingToRemember'] = request_data[
                'thingToRemember'] if 'thingToRemember' in request_data else errorMsg.append(
                {"message": "Thing to remember is required"})

            storyObj['thingToForget'] = request_data[
                'thingToForget'] if 'thingToForget' in request_data else errorMsg.append(
                {"message": "Thing to forget is required"})

            storyObj['dateTime'] = datetime.now()

            storyObj['keywords'] = request_data['keywords'] if 'keywords' in request_data else errorMsg.append(
                {"message": "Keywords is required"})

            tf = TxtFragmenter()
            if 'content' in request_data:
                paras = tf.cleanAndFragment(text=request_data['content'])
                storyObj['content'] = paras if 'content' in request_data and len(paras) > 0 else errorMsg.append(
                    {"message": "content is required"})

            if len(errorMsg) > 0:  # error after processing the formData
                return jsonify({"error": errorMsg}), 400

            if storyFind['language'] == 'en':
                cvnlp = CovidDiariesNLP()
                dataTags = cvnlp.getNLPInfo(text=request_data['content'])
                if dataTags:
                    storyObj['keywords'] = list(set(storyObj['keywords'] + dataTags['keywords']))
                    storyObj['cities'] = list(set(storyObj['cities'] + dataTags['cities']))
                    storyObj['abusive'] = dataTags['abusive']
                    storyObj['emotions'] = dataTags['emotions']

            try:  # handle databases carefully
                newStoryQuery = {'$set': storyObj}
                storyCollection.update_one(storyFind, newStoryQuery, True)

            except Exception as exc:
                return jsonify({"message": str(exc)}), 400

            return jsonify({
                'message': "successfully submitted"}), 200

    except Exception as e:
        return {"error": str(e)}, 400


# def run_task():
#     schedule.every().day.at("09:03:50").do(toi)
#     schedule.every().day.at("00:00").do(slate)
#     while True:
#         schedule.run_pending()
#         time.sleep(1)


port = int(os.environ.get('PORT', 5000))
if __name__ == '__main__':
    # try:
    #     threading.Thread(target=run_task).start()
    # except Exception as e:
    #     print("Caught an exception", e)

    # threading.Thread(target=run_task).start()
    app.run(threaded=True, host='0.0.0.0', port=port, debug=True)
