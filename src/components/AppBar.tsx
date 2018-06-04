import ghoul, { h } from 'ghoulapp';

import * as StyleSheet from 'utils/StyleSheet';

const classes = StyleSheet.create({
  appBar: {
    position: 'relative',
    // padding: 10,
    // display: 'flex',
    // justifyContent: 'space-between',
  },
});

export default function (props) {
  return (
    <div className={classes.appBar}>
      {props.children}
    </div>
  );
}