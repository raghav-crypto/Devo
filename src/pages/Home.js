import React, { useEffect } from "react";

// MUI stuff
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

// Components
import Devos from "../components/Devos";
import Profile from "../components/Profile";

// Action Functions
import { getDevos } from "../redux/actions/dataActions";
import { likeDevo } from "../redux/actions/dataActions";
import { unlikeDevo } from "../redux/actions/dataActions";

// Redux
import { connect } from "react-redux";
function Home({ getDevos, data: { devos, loading } }) {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDevos();
    }
    return () => (mounted = false);
  }, [getDevos]);
  let recentDevoMarkup = !loading ? (
    devos.map((devo) => <Devos key={devo.devoId} devos={devo} />)
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={8} xs={12}>
        {recentDevoMarkup}
      </Grid>
      <Grid item sm={12} md={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getDevos })(Home);
