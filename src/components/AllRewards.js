import React, { Component } from "react";
import Color from "color";
import GoogleFont from "react-google-font-loader";
import { makeStyles } from "@material-ui/core/styles";
import NoSsr from "@material-ui/core/NoSsr";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import { whiteBright } from "chalk";
// import white from "material-ui/colors/white";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
}));

const useStyles = makeStyles(() => ({
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
}));

const AddCard = ({ classes, image, title, subtitle }) => {
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
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

const CustomCard = ({ classes, image, title, subtitle }) => {
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
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export const AllRewards = React.memo(function RewardCard() {
  //if user state -> student, add 'buy' option to each card

  const gridStyles = useGridStyles();
  const styles = useStyles({ color: "#808080" });
  const styles2 = useStyles({ color: "#B8C1EC" });
  const styles3 = useStyles({ color: "#F6D4A0" });
  const styles4 = useStyles({ color: "#232946" });

  return (
    <section>
      <Grid
        classes={gridStyles}
        container
        margin={100}
        spacing={4}
        wrap={"nowrap"}
      >
        <Grid item>
          <AddCard
            classes={styles}
            title={"Add a Reward"}
            subtitle={"Click to add a new reward."}
            image={
              "https://www.jampedals.com/wp-content/uploads/2017/05/plus-sign.jpg"
            }
          />
        </Grid>
        <Grid item>
          <CustomCard
            classes={styles2}
            title={"Reward 3"}
            subtitle={"Description"}
            image={
              "https://image.freepik.com/free-vector/icon-gamepad-play-arcade-video-game-gamer-custom-designcartoon-illustration_185390-205.jpg"
            }
          />
        </Grid>
        <Grid item>
          <CustomCard
            classes={styles3}
            title={"Reward 3"}
            subtitle={"Description"}
            image={
              "https://i.pinimg.com/originals/e5/22/fa/e522fa1d1e7ca2e488c35b3af0e313ab.jpg"
            }
          />
        </Grid>
        <Grid item>
          <CustomCard
            classes={styles4}
            title={"Reward 4"}
            subtitle={"Description"}
            image={
              "https://media.istockphoto.com/vectors/kids-playground-equipment-vector-id628557920?k=6&m=628557920&s=612x612&w=0&h=VOgKLXv82h51lSB3VdB55f9vwoXn0OJcJxPjxCzhtKQ="
            }
          />
        </Grid>
      </Grid>
    </section>
  );
});
export default AllRewards;
