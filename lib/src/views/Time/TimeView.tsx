import * as React from 'react';
import * as PropTypes from 'prop-types';
import ClockType from '../../constants/ClockType';
import { MaterialUiPickersDate } from '../../typings/date';
import { useUtils } from '../../_shared/hooks/useUtils';
import TimeInput from './TimeInput';

export interface TimePickerViewProps {
  /** TimePicker value */
  date: MaterialUiPickersDate;
  /** Clock type */
  focus: 'hours' | 'minutes' | 'seconds';
  /** 12h/24h clock mode */
  ampm?: boolean;
  /** Minutes step */
  minutesStep?: number;
  /** On time change */
  onChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

const TIME_FORMAT = 'HH:mm'; // This may differ per-library, but I know this is right for moment

export const TimeView: React.FC<TimePickerViewProps> = ({ onChange, ampm, date, minutesStep }) => {
  const utils = useUtils();

  const parseTimeString = (str: string, d: MaterialUiPickersDate): MaterialUiPickersDate => {
    const time = utils.parse(str, TIME_FORMAT);
    return utils.mergeDateAndTime(d, time);
  };
  const formatTime = (d: MaterialUiPickersDate): string => utils.format(d, TIME_FORMAT);

  return (
    <div>
      <TimeInput
        value={formatTime(date)}
        onChange={e => {
          const d = parseTimeString(e.target.value, date);
          onChange(d);
        }}
        minutesStep={minutesStep}
      />
    </div>
  );
};

TimeView.displayName = 'TimePickerView';

TimeView.propTypes = {
  date: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number,
} as any;

TimeView.defaultProps = {
  ampm: true,
  minutesStep: 1,
};

export default React.memo(TimeView);
