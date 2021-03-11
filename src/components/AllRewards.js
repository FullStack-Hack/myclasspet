import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import axios from "axios";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
}));

const useStyles = makeStyles(( theme ) => ({
  body: {
    margin: "7%"
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
    fontFamily: "Keania One",
    fontSize: "1rem",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  subtitle: {
    fontFamily: "Montserrat",
    color: "#FFFFFF",
    opacity: 0.87,
    marginTop: "2rem",
    fontWeight: 500,
    fontSize: 14,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    justifyContent: 'center',
  },
  submit: {
    marginTop: '2%',
    backgroundColor: '#B8C1EC'
  }
}));

const AddCard = ({ classes, image, title, subtitle, modalFunction }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea} onClick={modalFunction}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={"h3"}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

const CustomCard = ({ classes, image, title, subtitle, cost }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={"h3"}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
          <CardActions display='flex'>
            <Typography>{cost} Points</Typography>
          </CardActions>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export const AllRewards = React.memo(function RewardCard() {
  //if user state -> student, add 'buy' option to each card

  const gridStyles = useGridStyles();
  const classes = useStyles();

  const {user} = useSelector((state) => state)
  console.log("USERRRRR:", user)

  const styles = useStyles({ color: '#808080' });
  const styles2 = useStyles({ color: '#B8C1EC' });

  const [rewards, setRewards] = useState(null);
  const [open, setOpen] = useState(false);

  const defaultReward = { name: '', description: '', cost: 0, imageUrl: '' }
  const [newReward, setNewReward] = useState(defaultReward);

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

  const handleChange = event => {
    const {name, value} = event.target
    setNewReward({...newReward, [name]: value})
    console.log("CHANGING NR:", newReward)
  }

  const handleDelete = async (rewardId) => {
    try {
      await axios.delete(`/api/rewards/${rewardId}`);
      setRewards(rewards.filter(reward => reward.id !== rewardId))
    } catch (error) {
      console.log(error);
    }
  }

  const handleClaim = async (rewardId, userId) => {
    try {
      console.log("REWARD ID:", rewardId, "USER ID:", userId)
      await axios.put('/api/rewards', {rewardId})
    } catch (error) {
      console.log(error);
    }
  }

  const addReward = async (event) => {
    try {
      event.preventDefault()
      console.log("NEW REWARD:", newReward)
      let { data } = await axios.post("/api/rewards", newReward);
      rewards.push(data);
      handleClose();
      setNewReward(defaultReward)
    } catch (error) {
      console.log("We encountered an error in creating this reward", error);
    }
  }

  useEffect(() => {
    if (rewards === null) {
      getRewards();
    }
  }, [rewards])

  return (
    <section>
      <Grid classes={gridStyles} container margin={100} spacing={4} wrap={'nowrap'}>
        <Grid item onClick={handleOpen}>
          {user.isAdmin && <AddCard
            classes={styles}
            title={"Add a Reward"}
            subtitle={"Click to add a new reward."}
            image={
              "https://www.jampedals.com/wp-content/uploads/2017/05/plus-sign.jpg"
            }
          />}
        </Grid>
        {rewards && rewards.map(reward => {
          return (
            <Grid item key={reward.id}>
              <CustomCard
                classes={styles2}
                title={reward.name}
                subtitle={reward.description}
                cost={reward.cost}
                image={reward.imageUrl}
                onClick={handleOpen}
              />
              {user.isAdmin && <Button type="button" onClick={() => handleDelete(reward.id)}>Delete This Reward</Button>}
              {!user.isAdmin && <Button type="button" onClick={() => handleClaim(reward.id, user.id)}>Claim This Reward</Button>}
            </Grid>
          )
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
              <p id="transition-modal-description">Please complete the fields below and click on 'create a new reward' button.</p>
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

