import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Devos from "../components/devo/Devos";
import StaticProfile from "../components/profile/StaticProfile";
import { getUserData } from "../redux/actions/dataActions";
function User({ getUserData, match, data: { devos, loading } }) {
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
          console.log(res.data);
          setProfile(res.data.user);
        })
        .catch((err) => console.log(err));
    }
    return () => (mounted = false);
  }, [getUserData, match.params.handle]);
  const devoMarkup = loading ? (
    <p>Loading...</p>
  ) : devos.length === 0 ? (
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
    <div>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {devoMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {profile === null ? (
            <p>Loading Profile</p>
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
