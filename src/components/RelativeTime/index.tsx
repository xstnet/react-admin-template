import { Tooltip, TooltipProps } from 'antd';

interface IProps extends ItemSharedProps {
  time: string;
}

type TimeRulesType = [number, number, string];

const beforeRules: TimeRulesType[] = [
  [2, 1, '刚刚'],
  [60, 1, '%d秒前'],
  [3600, 60, '%d分钟前'],
  [86400, 3600, '%d小时前'],
  [86400 * 30, 3600 * 24, '%d天前'],
  [86400 * 30 * 12, 3600 * 24 * 30, '%d月前'],
  [Infinity, 3600 * 24 * 30 * 12, '%d年前']
];

const afterRules: TimeRulesType[] = [
  [-60, 1, '%d秒后'],
  [-3600, 60, '%d分钟后'],
  [-86400, 3600, '%d小时后'],
  [-(86400 * 30), 3600 * 24, '%d天后'],
  [-(86400 * 30 * 12), 3600 * 24 * 30, '%d月后'],
  [-Infinity, 3600 * 24 * 30 * 12, '%d年后']
];

const RelativeTime: React.FC<IProps> = ({ time, ...props }) => {
  const currTimeAT = Math.floor(new Date().getTime() / 1000);
  const fromTimeAt = Math.floor(new Date(time).getTime() / 1000);

  const diffSeconds = currTimeAT - fromTimeAt;

  if (isNaN(fromTimeAt)) {
    return <>time</>;
  }

  const timeRules = diffSeconds < -1 ? afterRules : beforeRules;

  let timeFormat = '';

  for (const [maxDiffSeconds, unit, format] of timeRules) {
    if (Math.abs(diffSeconds) < Math.abs(maxDiffSeconds)) {
      const value = Math.floor(Math.abs(diffSeconds) / unit);
      timeFormat = format.replace('%d', String(value));
      break;
    }
  }

  return (
    <Tooltip title={time}>
      <span {...props}>{timeFormat}</span>
    </Tooltip>
  );
};

export default RelativeTime;
