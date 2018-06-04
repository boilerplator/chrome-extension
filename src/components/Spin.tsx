import ghoul, { h } from 'ghoulapp';

import * as StyleSheet from 'utils/StyleSheet';

const classes = StyleSheet.create({
  spin: {
    fontSize: 16,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
  },

  spinIconWrapper: {
    textAlign: 'center',
  },

  spinIcon: {
    
  },

  spinRect: {
    transformOrigin: 'center',
    animation: 'spin 1s infinite',
  },

  spinCircle: {
    transformOrigin: 'center',
    animation: 'spin 1s infinite',
    animationDelay: '.5s',
  },

  spinLabel: {
    display: 'block',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },

  icon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    font: 'normal normal normal 14px/1 "weui"',
    textRendering: 'auto',
    WebkitFontSmoothing: 'antialiased',
    fontSize: 93,

    '&:before': {
      margin: 0,
      content: '\EA0B',
      display: 'inline-block',
    },
  },
});

const size = 92;

const STATUS = {
  '-1': {
    message: '连接失败，请重试!',
    component: () => (   
      <svg key={'-1'} width="92" height="92" viewBox="0 0 92 92">
        <g fill="none" fill-rule="evenodd">
          <circle cx="46" cy="46" r="46" fill="#F0382E"/>
          <path fill="#FFF" d="M45.96 43.045l-14.725-14.83-.005-.005c-.392-.39-1.025-.387-1.414.005l-2.02 2.035c-.388.39-.388 1.02 0 1.41L42.53 46.5 27.796 61.34c-.387.39-.387 1.02 0 1.41l2.02 2.035.006.005c.393.39 1.026.387 1.415-.005l14.726-14.83 14.726 14.83.005.005c.393.39 1.026.387 1.416-.005l2.02-2.035c.388-.39.388-1.02 0-1.41L49.39 46.5l14.736-14.84c.388-.39.388-1.02 0-1.41l-2.02-2.035-.006-.005c-.39-.39-1.025-.387-1.414.005L45.96 43.045z"/>
        </g>
      </svg>
    ),
  },
  '0': {
    message: '未连接',
    component: () => (
      <svg key={'0'} width="92" height="92" viewBox="0 0 92 92">
        <g fill="none" fill-rule="evenodd">
          <circle cx="46" cy="46" r="46" fill="#F7635F"/>
          <path fill="#FFF" d="M43.033 25h4.934c.553 0 1 .448 1 1v.032l-.934 29c-.017.54-.46.968-1 .968h-3.05c-.54 0-.982-.428-1-.967l-.95-29c-.017-.552.416-1.014.968-1.032h.033z"/>
          <circle cx="45.5" cy="64.5" r="3.5" fill="#FFF"/>
        </g>
      </svg>
    ),
  },
  '1': {
    message: '正在连接',
    component: ({ color, strokeWidth }) => (
      <svg key={'1'} className={classes.spinIcon} width={size} height={size}>
        <rect
          className={classes.spinRect}
          x={size / 3}
          y={size / 3}
          width={size / 3}
          height={size / 3}
          fill={color}
        />
        <circle
          className={classes.spinCircle}
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - strokeWidth}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </svg>
    ),
  },
  '2': {
    message: '已连接',
    component: () => (
      <svg key={'2'} width="92" height="92" viewBox="0 0 92 92">
        <g fill="none" fill-rule="evenodd">
          <circle cx="46" cy="46" r="46" fill="#08BB05"/>
          <path fill="#FFF" d="M23.744 48.185l2.277-2.123c.366-.34.925-.36 1.312-.046l11.31 9.156c.37.3.902.296 1.27-.01l28.97-24.176c.42-.35 1.043-.3 1.4.115l1.456 1.693c.346.402.318 1.004-.064 1.373L39.82 64.854c-.398.382-1.03.37-1.414-.026l-14.7-15.217c-.383-.396-.372-1.03.026-1.413l.012-.012z"/>
        </g>
      </svg>
    ),
  },
};

export default function ({ status = 0, color = '#7adcc1', strokeWidth = 3 }) {
  const { message = `消息不正确: ${status}`, component: Component = () => null } = STATUS[status] || {};
  return (
    <div className={classes.spin}>
      <div className={classes.spinIconWrapper}>
        <Component color={color} strokeWidth={strokeWidth} />
      </div>
      <label className={classes.spinLabel}>{message}</label>
    </div>
  );
}