import React from 'react';
import Input from '@material-ui/core/Input';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

export interface TimeInputProps extends WithStyles<typeof styles> {
  value: number;
  onChange: (value: string) => void;
  minutesStep?: number;
}

const TimeInput = ({
  value,
  onChange,
  minutesStep,
  classes,
}: TimeInputProps): React.ReactElement => {
  return (
    <div className={classes.container}>
      <Input
        classes={{ root: classes.input }}
        id="time"
        type="time"
        value={value}
        onChange={onChange}
        inputProps={{
          step: 60 * (minutesStep || 1),
          style: { fontSize: 40, lineHeight: 60 },
        }}
      />
    </div>
  );
};

export const styles = (theme: Theme) => {
  console.log(theme);
  return createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px`,
      paddingTop: '15px',
      paddingBottom: '15px',
    },
  });
};

export default withStyles(styles, {
  name: 'MuiPickersClock',
})(TimeInput as React.ComponentType<TimeInputProps>);
