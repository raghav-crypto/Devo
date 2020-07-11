import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { profileTheme } from "../components/theme";

import Devos from "../components/devo/Devos";
import StaticProfile from "../components/profile/StaticProfile";
import DevoSkeleton from "../utils/DevoSkeleton";

import { getUserData } from "../redux/actions/dataActions";
import { CircularProgress } from "@material-ui/core";
function User({ getUserData, match, data: { devos, loading } }) {
  const useStyles = makeStyles(profileTheme);
  const classes = useStyles();
  const [profile, setProfile] = useState(null);
  const [devoIdParam, setDevoIdParam] = useState(null);
  useEffect(() => {
    let mounted = true;
    const devoId = match.params.devoId;
    if (devoId) {
      setDevoIdParam(devoId);
    }
    if (mounted) {
      const handle = match.params.handle;
      getUserData(handle);
      axios
        .get(`/user/${handle}`)
        .then((res) => {
          setProfile(res.data.user);
        })
        .catch((err) => console.log(err));
    }
    return () => (mounted = false);
  }, [getUserData, match.params.handle, match.params.devoId]);
  const devoMarkup = loading ? (
    <DevoSkeleton />
  ) : !devos ? (
    <Typography>No Devos from this User</Typography>
  ) : devoIdParam === null ? (
    devos.map((devo) => <Devos key={devo.devoId} devos={devo} />)
  ) : (
    devos.map((devo) => {
      if (devo.devoId !== devoIdParam) {
        return <Devos key={devo.devoId} devos={devo} />;
      } else {
        return <Devos key={devo.devoId} devos={devo} openDialog />;
      }
    })
  );
  return (
    <div style={{ margin: "100px auto 0 auto", maxWidth: "1200px" }}>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {devoMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {profile === null ? (
            <div className={classes.spinnerDiv}>
              <CircularProgress size={160} thickness={2} />
            </div>
          ) : (
            <StaticProfile profile={profile} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getUserData })(User);
