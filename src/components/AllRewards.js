import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Color from "color";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { updatePoints } from "./store";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import GradeIcon from '@material-ui/icons/Grade';
import EditIcon from '@material-ui/icons/Edit';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%"
  },
}));

const useStyles = makeStyles((theme) => ({
  body: {
    margin: "7%",
  },
  actionArea: {
    borderRadius: 16,
    // flexBasis: 23,
    display: "flex",
    // flexBasis: '33.333%',
    width: 256,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,
    // flexBasis: '33.333%',
    boxShadow: "none",
    "&:hover": {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: "1rem 1.5rem 1.5rem",
    };
  },
  title: {
    fontSize: "1rem",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#FFFFFF",
    opacity: 0.87,
    marginTop: ".5rem",
    fontWeight: 500,
    fontSize: 14,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // justifyContent: "center",
  },
  submit: {
    marginTop: "2%",
    backgroundColor: "#B8C1EC",
  },
  points: {
    marginTop: "2%",
    backgroundColor: "#B8C1EC",
    color: "#FFFFFF"
  },
  delete: {
    // marginTop: "1%",
    // marginRight: "0",
    // width: "100px",
    position: "relative",
    // zIndex: "100",
    float: "right"
  },
  icons: {
    display: "flex",
  }
}));

export const AllRewards = React.memo(function RewardCard() {

  const dispatch = useDispatch()

  const gridStyles = useGridStyles();
  const classes = useStyles();

  const { user } = useSelector((state) => state);

  const styles = useStyles({ color: "#808080" });
  const styles2 = useStyles({ color: "#B8C1EC" });
  const mediaStyles = useFourThreeCardMediaStyles();

  const [rewards, setRewards] = useState(null);
  const [open, setOpen] = useState(false);

  const defaultReward = { name: "", description: "", cost: 0, imageUrl: "" };
  const [newReward, setNewReward] = useState(defaultReward);
  const [myPoints, setMyPoints] = useState({points: user.points});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getRewards() {
    try {
      let response = await axios.get("/api/rewards");
      setRewards(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewReward({ ...newReward, [name]: value });
  };

  const handleDelete = async (rewardId) => {
    try {
      await axios.delete(`/api/rewards/${rewardId}`);
      setRewards(rewards.filter((reward) => reward.id !== rewardId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClaim = async (rewardId, points, studentId, isAdmin) => {
    try {
      if (!isAdmin) {
        if (points > user.points) {
          alert("You don't have enough points yet. Keep going! <3");
        } else {
          await axios.put("/api/rewards", { rewardId, studentId });
          points *= -1
          setMyPoints({ points: user.points + points});
          dispatch(updatePoints(studentId, points));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addReward = async (event) => {
    try {
      event.preventDefault();
      let { data } = await axios.post("/api/rewards", newReward);
      rewards.push(data);
      handleClose();
      setNewReward(defaultReward);
    } catch (error) {
      console.log("We encountered an error in creating this reward", error);
    }
  };

  useEffect(() => {
    if (rewards === null) {
      getRewards();
    }
  }, [rewards]);

  return (
    <section>
      {!user.isAdmin && (
        <Button className={classes.points} startIcon={<GradeIcon style={{ color: "#FFD500" }}></GradeIcon>}>
          My Points: {myPoints.points}
        </Button>
      )}
      <Grid
        classes={gridStyles}
        container
        margin={100}
        spacing={4}
        // wrap={"nowrap"}
      >
        <Grid item>
          {user.isAdmin && (
            <CardActionArea className={styles.actionArea} onClick={handleOpen}>
              <Card className={styles.card}>
                <CardMedia classes={mediaStyles} image="https://www.jampedals.com/wp-content/uploads/2017/05/plus-sign.jpg"></CardMedia>
                <CardContent classes={styles} className={styles.content}>
                  <Typography className={styles.title} variant={"h3"}>
                    Add a Reward
                  </Typography>
                  <Typography className={styles.subtitle}>Click to add a new reward</Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          )}
        </Grid>
        {rewards &&
          rewards.map((reward) => {
            return (
              <Grid item key={reward.id}>
                <CardActionArea className={styles2.actionArea}>
                    <Card className={styles2.card} onClick={() => handleClaim(reward.id, reward.cost, user.id, user.isAdmin)}>
                      <CardMedia classes={mediaStyles} image={reward.imageUrl}>
                        {user.isAdmin && (
                          <div classes={styles2.icons}>
                            <IconButton aria-label="delete" classes={styles2.delete} onClick={() => handleDelete(reward.id)}>
                              <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="delete" classes={styles2.delete} >
                            <EditIcon />
                            </IconButton>
                          </div>
                        )}
                      </CardMedia>
                      <CardContent className={styles2.content}>
                        <Typography className={styles2.title} variant={"h3"}>
                          {reward.name}
                        </Typography>
                        <Typography className={styles2.subtitle} variant={"h3"}>
                          ( {reward.cost} Points )
                        </Typography>
                        <Typography className={styles2.subtitle}>{reward.description}</Typography>
                      </CardContent>
                    </Card>
                  </CardActionArea>
              </Grid>
            );
          })}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">New Reward</h2>
              <p id="transition-modal-description">
                Please complete the fields below and click on 'create a new
                reward' button.
              </p>
              <form className={classes.form} onSubmit={addReward} noValidate>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Enter a name for the reward"
                      autoFocus
                      onChange={handleChange}
                      value={newReward.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="description"
                      label="Enter a description for the reward"
                      name="description"
                      autoComplete="description"
                      onChange={handleChange}
                      value={newReward.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="cost"
                      label="Enter a cost for the reward"
                      id="cost"
                      autoComplete="cost"
                      onChange={handleChange}
                      value={newReward.cost}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="imageUrl"
                      label="Paste/enter an image URL for the reward"
                      id="imageUrl"
                      autoComplete="imageUrl"
                      onChange={handleChange}
                      value={newReward.imageUrl}
                    />
                  </Grid>
                  <br />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="#FFFFFF"
                  className={classes.submit}
                >
                  Create a new reward
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </Grid>
    </section>
  );
});

export default AllRewards;
