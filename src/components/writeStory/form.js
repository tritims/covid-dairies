import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import './form.css'
import { useTranslation } from "react-i18next";
import Chip from '@material-ui/core/Chip';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { constants } from "../../constants";
import { useParams } from "react-router-dom";


var fields = {
  name: "",
  age: "",
  city: "",
  gender: "",
  experienceType: "Covid patient",
  symptoms: "",
  duration: "",
  isCured: "Yes",
  title: "",
  content: "",
  question1: "",
  question2: "",
};

// {
//   name: "xxx",
//   age: "25", 
//   city: "xxxx",
//   gender: "M",
//   experienceType: "Covid Patient",
//   symptoms: "cold, cough, fever",
//   duration: "1 month",
//   isCured: "Yes/No",
//   title: "",
//   content: "",
//   thigToRemember: "xxx",
//   thingToForget: "vvdfdf",
//   keywords: ["sdfsdf", "dfsdfd"]
// }

const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Other",
    label: "Other",
  },
];

var kwBase = {
  "positive": false,
  "hospital": false,
  "fever": false,
  "test": false,
  "quarantine": false,
  "isolation": false,
  "vaccination": false,
  "cough": false,
  "recovery": false,
  "smell": false,
  "infection": false,
  "paracetamol": false,
  "body ache": false
};


const experienceTypes = [
  {
    value: "Covid patient",
    label: "Covid patient",
  },
  {
    value: "Family member/friend of Covid patient",
    label: "Family member/friend of Covid patient",
  },
  {
    value: "Healthcare worker",
    label: "Healthcare worker",
  },
  {
    value: "Vaccination",
    label: "Vaccination",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const isCuredOptions = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { i18n } = useTranslation()
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  // const [keywords, setKeywords] = useState([])
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState("");
  const [city, setCity] = React.useState("");
  const [symptoms, setSymptoms] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [experienceType, setExperienceType] = React.useState("Covid patient");
  const [isCured, setIsCured] = React.useState("Yes");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [question1, setQuestion1] = React.useState("");
  const [question2, setQuestion2] = React.useState("");
  const [keywords, setKeywords] = React.useState(kwBase);
  const [token, setToken] = React.useState("");
  const [mode, setMode] = React.useState("write")
  let { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setToken(await getAccessTokenSilently());
      // console.log(token);
    };
    fetch();
    let uri = props.location.pathname
    if(uri.includes('edit')){
      setMode("edit");
      // setStoryId(uri.split("/")[uri.split("/").length-1])
      axios.get(
        `${constants().serverBaseUrl}/id=${id}`
      ).then((res) => {
        if(res.data){
          setAge(res.data.age)
          setName(res.data.name)
          setCity(res.data.cities[0]) //Stored as array in backend
          setGender(res.data.gender)
          setExperienceType(res.data.experienceType)
          setIsCured(res.data.isCured)
          setSymptoms(res.data.symptoms)
          setTitle(res.data.title)
          setContent(res.data.content.join(" "))
          setQuestion1(res.data.thingToRemember)
          setQuestion2(res.data.thingToForget)
          setDuration(res.data.duration)
          i18n.changeLanguage(res.data.language)
          // setSymptoms(res.data.symptoms.join(','))
          // Do keyword stuff
          let keys = Object.keys(kwBase);
          let kws = res.data.keywords;
          for(let i=0; i<keys.length; i++){
            if(kws.includes(t(keys[i]))){
              kwBase[keys[i]] = true // Highlight all keywords
            }
          }
          setKeywords(kwBase)

          // Set Form data values 
          fields.name = res.data.name;
          fields.age = res.data.age;
          fields.question1 = res.data.thingToRemember;
          fields.question2 = res.data.thingToForget;
          fields.duration = res.data.duration;
          fields.symptoms = res.data.symptoms;
          fields.title = res.data.title;
          fields.experienceType = res.data.experienceType;
          fields.isCured = res.data.isCured;
          fields.city = res.data.cities[0]
          fields.gender = res.data.gender;
          fields.content = res.data.content.join(' ');
        }
        
        console.log(res.data)
      }, (err) => {
        console.log(err)
      });
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
    fields.name = event.target.value;
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    fields.gender = event.target.value;
  };

  const handleAgeChange = (event) => {
    if (event.target.value > 0 || event.target.value === "") {
      setAge(event.target.value);
      fields.age = event.target.value;
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    fields.city = event.target.value;
  };

  const handleSymptomsChange = (event) => {
    setSymptoms(event.target.value);
    fields.symptoms = event.target.value;
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    fields.duration = event.target.value;
  };

  const handleExperienceTypeChange = (event) => {
    setExperienceType(event.target.value);
    fields.experienceType = event.target.value;
  };

  const handleIsCuredChange = (event) => {
    setIsCured(event.target.value);
    fields.isCured = event.target.value;
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    fields.title = event.target.value;
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
    fields.content = event.target.value;
  };

  const handleQuestion1Change = (event) => {
    setQuestion1(event.target.value);
    fields.question1 = event.target.value;
  };

  const handleQuestion2Change = (event) => {
    setQuestion2(event.target.value);
    fields.question2 = event.target.value;
  };

  const getChipStyle = (kw) => {
    if (keywords[kw]) {
      return {
        background: "#280937 !important",
        color: "#ffff !important"
      }
    } else {
      return {}
    }
  }

  const chipClicked = (event) => {
    setKeywords({
      event : !kwBase[event]
    })
    kwBase[event] = !kwBase[event]
    
    // console.log(kwBase)
  }

  const PUTFormData = (data) => {
    axios.put(
      `http://localhost:5000/api/v1/private/editStory/id=${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      const result = res.data;
      console.log(result)
      Swal.fire(t("Updated Successfully"), "", "success").then(() => {
        history.push('/dashboard')
      });
    }, (error) => {
      console.log(error);
      Swal.fire(t("Failed"), t("Unable to update. Try again later"), "error")
    }
    );
  }

  const POSTFormData = (data) => {
    axios.post(
      "http://localhost:5000/api/v1/private/addStory",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      const result = res.data;
      console.log(result)
      Swal.fire(t("Added Successfully"), "", "success").then(() => {
        history.push('/dashboard')
      });
    }, (error) => {
      console.log(error);
      Swal.fire(t("Failed"), t("Unable to add. Try again later"), "error")
    }
    );
  }
  const onSubmitHandler = () => {
    if (
      fields.age !== "" &&
      fields.city !== "" &&
      fields.gender !== "" &&
      fields.title !== "" &&
      fields.content !== ""
    ) {
      let k = []
      let keys = Object.keys(kwBase)
      for (let i = 0; i < keys.length; i++) {
        if (kwBase[keys[i]]) {
          k.push(t(keys[i]))
        }
      }
      let reqBody = {
        name: fields.name,
        age: fields.age,
        city: fields.city,
        gender: fields.gender,
        experienceType: fields.experienceType,
        symptoms: fields.symptoms,
        duration: fields.duration,
        isCured: fields.isCured,
        title: fields.title,
        content: fields.content,
        thingToRemember: fields.question1,
        thingToForget: fields.question2,
        keywords: k,
        language: localStorage.getItem("lang") || "en"
      }
      console.log(reqBody)
      if(mode == 'edit'){
        PUTFormData(reqBody)
      } else {
        POSTFormData(reqBody)
      }
      
    } else {
      alert(t("FillAllMandatory"));
    }

    /**Submit to backend with POST/PUT */
  };

  return (
    <Grid container className="formContainer" xs={9} md={9} lg={9}>
      <Grid item xs={12} className="formSection">
        <div>
          <p>
            {t("IntroToForm")}
            {/* Over the past weeks, maybe months, you have been taking action and
            developing many creative ideas to face these challenging times,
            whether by helping your community, finding innovative learning ways,
            keeping a positive spirit, taking care of your relatives and loved
            ones, and much much more. */}
          </p>
          <p>
            {t("LetTheWorldKnow")}
            {/* Let the world hear about YOUR own experience of this COVID-19
            pandemic. Share your experience by filling this form. */}
          </p>
          <p>
            {t("NoAbusiveLanguage")}
            {/* Please <b>avoid</b> using abusive words. <b>Don't</b> spread hate. */}
          </p>
        </div>
      </Grid>
      <Grid item xs={12} className="formSection">
        <React.Fragment>
          <Typography variant="h6" gutterBottom className="theme-color sectionHeader">
            {t("Your Details")}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label={t("Name")}
                value={name}
                onChange={handleNameChange}
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="age"
                name="age"
                label={t("Age")}
                type="number"
                value={age}
                onChange={handleAgeChange}
                variant="outlined"
                color="secondary"
                fullWidth
                className="ageField" // Hide increment button
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="city"
                name="city"
                label={t("Location")}
                value={city}
                onChange={handleCityChange}
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="gender"
                name="gender"
                select
                label={t("Gender")}
                value={gender}
                onChange={handleGenderChange}
                variant="outlined"
                color="secondary"
                fullWidth
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid item xs={12} className="formSection">
        <React.Fragment>
          <Typography variant="h6" gutterBottom className="theme-color sectionHeader">
            {t("Type Of Experience")}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="experienceType"
                select
                label=""
                value={experienceType}
                onChange={handleExperienceTypeChange}
                variant="outlined"
                color="secondary"
                fullWidth
              >
                {experienceTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {t(option.label)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              {experienceType === "Covid patient" ||
                experienceType === "Family member/friend of Covid patient" ? (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="symptoms"
                      name="symptoms"
                      label={t("Symptoms")}
                      value={symptoms}
                      onChange={handleSymptomsChange}
                      multiline
                      variant="outlined"
                      color="secondary"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="duration"
                      name="duration"
                      label={t("Duration")}
                      value={duration}
                      onChange={handleDurationChange}
                      variant="outlined"
                      color="secondary"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="isCured"
                      select
                      label={t("CuredStatus")}
                      value={isCured}
                      onChange={handleIsCuredChange}
                      variant="outlined"
                      color="secondary"
                      fullWidth
                    >
                      {isCuredOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {t(option.label)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid item xs={12} className="formSection">
        <React.Fragment>
          <Typography variant="h6" gutterBottom className="theme-color sectionHeader">
            {t("Share your experience")}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label={t("Title")}
                value={title}
                onChange={handleTitleChange}
                multiline
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="content"
                name="content"
                placeholder={t("Write your story here")+ '*'}
                multiline
                value={content}
                onChange={handleContentChange}
                rows="8"
                variant="outlined"
                color="secondary"
                fullWidth
                style={{ paddingTop: "2px !important" }} //to avoid alphabets getting chopped
              />
            </Grid>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid item xs={12} className="formSection">
        <React.Fragment>
          <Typography variant="h6" gutterBottom className="theme-color sectionHeader">
            {t("Something you'll always remember about this pandemic")}:
          </Typography>
          <Grid item xs={12}>
            <TextField
              required
              id="final-question-1"
              name="final-question-1"
              multiline
              value={question1}
              onChange={handleQuestion1Change}
              rows="4"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid >
          <Typography variant="h6" gutterBottom className="theme-color sectionHeader" style={{ marginTop: "50px" }}>
            {t("Something you'll want to forget about this pandemic")}:
          </Typography>
          <Grid item xs={12}>
            <TextField
              required
              id="final-question-2"
              name="final-question-2"
              multiline
              value={question2}
              onChange={handleQuestion2Change}
              rows="4"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid xs={12}>
        <Typography variant="h6" gutterBottom className="theme-color sectionHeader">
          {t("Select Keywords associated with your story")}:
        </Typography>
        <React.Fragment>
          <ul style={{ padding: "0px" }}>
            {
              Object.keys(kwBase).map(
                kw => {
                  return (
                    <li style={{ display: "inline", margin: "2px" }}>
                      <Chip
                        label={t(kw)}
                        onClick={() => chipClicked(kw)}
                        className={{
                          'active': kwBase[kw],
                          'chip': true
                        }}
                        // style={getChipStyle(kw)}
                      />
                    </li>
                  )
                }
              )
            }
          </ul>
        </React.Fragment>
      </Grid>
      <Grid item xs={12} style={{ marginBottom: "25px" }}>
        <React.Fragment>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              style={{ background: "#280937" }}
              className={classes.button}
              onClick={onSubmitHandler}
            >
              {t("Submit")}
            </Button>
          </div>
        </React.Fragment>
      </Grid>
    </Grid>
  );
}
