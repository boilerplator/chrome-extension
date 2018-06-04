import ghoul, { h } from 'ghoulapp';

import * as StyleSheet from 'utils/StyleSheet';

const classes = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    fontSize: 16,
    overflowX: 'hidden',
    overflowY: 'hidden',
    paddingBottom: 0,
    display: 'flex',
    flexFlow: 'column wrap',
  },
});

export default function (props) {
  return (
    <div className={classes.page}>
      {props.children}
    </div>
  );
}