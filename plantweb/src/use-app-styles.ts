import { relative } from "path";
import { makeStyles } from "tss-react/mui";

export const useAppStyles = makeStyles()(() => ({
  root: {
    display: "flex",
  },
  header: {
    display: "fixed",
    textAlign: "center",
    color: "green",
  },
  page_title: {
    display: "fixed",
    justifyContent: "center",
    textAlign: "center",
    color: "black",
  },
  page_title_with_delete: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "end",
    color: "black",
  },
  page_item_list: {
    backgroundColor: "000",
    padding: 1,
    textAlign: "center",
    color: "green",
  },
  add_button: {
    display: "fixed",
    marginTop: "100%",
    justifyContent: "flex-end",
    position:'absolute',
    bottom:0,
  },
}));
