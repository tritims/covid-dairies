# cleaning title from TOI scraper heading
def cleanTitle(s):
    title = s.replace('"', "").replace("\n", "")
    ind = 0
    for i in range(len(s)):
        if s[i] == ":":
            ind = i
    return title[ind + 1:]
