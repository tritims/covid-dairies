import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

export default function Form() {
  const classes = useStyles();

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

  const onSubmitHandler = () => {
    if (
      fields.age !== "" &&
      fields.city !== "" &&
      fields.gender !== "" &&
      fields.title !== "" &&
      fields.content !== ""
    ) {
      console.log(fields);
    } else {
      alert("Please fill all the required fields (fields with * symbol)");
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid item>
        <div>
          <p>
            Over the past weeks, maybe months, you have been taking action and
            developing many creative ideas to face these challenging times,
            whether by helping your community, finding innovative learning ways,
            keeping a positive spirit, taking care of your relatives and loved
            ones, and much much more.
          </p>
          <p>
            Let the world hear about YOUR own experience of this COVID-19
            pandemic. Share your experience by filling this form.
          </p>
          <p>
            Please <b>avoid</b> using abusive words. <b>Don't</b> spread hate.
          </p>
        </div>
      </Grid>
      <Grid item>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Your Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Name(optional)"
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
                label="Age"
                type="number"
                value={age}
                onChange={handleAgeChange}
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
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
                label="Gender"
                value={gender}
                onChange={handleGenderChange}
                variant="outlined"
                color="secondary"
                fullWidth
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid item xs={12}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Type Of Experience
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
                    {option.label}
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
                      label="Symptoms"
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
                      label="Duration"
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
                      label="Patient cured?"
                      value={isCured}
                      onChange={handleIsCuredChange}
                      variant="outlined"
                      color="secondary"
                      fullWidth
                    >
                      {isCuredOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
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
      <Grid item xs={12}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Share your experience
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
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
                placeholder="Write your story here*"
                multiline
                value={content}
                onChange={handleContentChange}
                rows="8"
                variant="outlined"
                color="secondary"
                fullWidth
              />
            </Grid>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid item xs={12}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Something you'll always remember about this pandemic:
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
          </Grid>
          <Typography variant="h6" gutterBottom>
            Something you'll want to forget about this pandemic:
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
      <Grid item>
        <React.Fragment>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
          </div>
        </React.Fragment>
      </Grid>
    </Grid>
  );
}
