import React, { useEffect, useState } from "react";

// MUI stuff
import { Grid } from "@material-ui/core";

// Components
import Devos from "../components/devo/Devos";
import Profile from "../components/profile/Profile";
import DevoSkeleton from "../utils/DevoSkeleton";
import Pagination from "../components/devo/Pagination";
// Action Functions
import { getDevos } from "../redux/actions/dataActions";

// Redux
import { connect } from "react-redux";
function Home({ getDevos, data: { devos, loading } }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDevos();
    }
    return () => (mounted = false);
  }, [getDevos]);

  useEffect(() => {
    let mounted = true;
    if (mounted && devos && devos.length) {
      setPosts(devos);
    }
    return () => (mounted = false);
  }, [loading, devos]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPost);
  let recentDevoMarkup =
    !loading && devos && devos.length === 0 ? (
      <h1 style={{ textAlign: "center" }}>No Devos Yet !</h1>
    ) : !loading && devos !== null ? (
      currentPosts.map((devo) => <Devos key={devo.devoId} devos={devo} />)
    ) : (
      <DevoSkeleton />
    );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={8} xs={12}>
        {recentDevoMarkup}
      </Grid>
      <Grid item sm={12} md={4} xs={12}>
        <Profile />
      </Grid>
      <Pagination
        paginate={paginate}
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
      />
    </Grid>
  );
}
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getDevos })(Home);
