import ghoul, { h } from 'ghoulapp';

import * as StyleSheet from 'utils/StyleSheet';

const classes = StyleSheet.create({
  appBody: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function (props) {
  return (
    <div className={`${classes.appBody} ${props.className}`}>
      {props.children}
    </div>
  );
}