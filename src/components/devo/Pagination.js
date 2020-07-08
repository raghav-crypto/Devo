import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {pageNumbers.map((number) => (
        <List key={number} component="nav" aria-label="main mailbox folders">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <ListItem
              onClick={() => {
                paginate(number);
              }}
              key={number}
              button
            >
              <ListItemText primary={number} />
            </ListItem>
          </div>
        </List>
      ))}
    </div>
  );
}

export default Pagination;
