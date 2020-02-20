import React, { Component } from 'react';
import { DateRange } from '../../../src';
import Section from './Section';

import 'normalize.css';
import '../styles/global.css';
import '../styles/main.css';

import '../../../src/styles.scss';
import '../../../src/theme/default.scss';
import moment from 'moment-timezone';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      },
    };
  }

  handleChange(which, payload) {
    this.setState({
      [which]: payload,
    });
  }

  handleRangeChange(which, payload) {
    const { selection: { startDate, endDate } } = payload;
    const currentStartDate = moment(startDate);
    const currentEndDate = moment(endDate);
    console.log(currentStartDate.toDate(), currentEndDate.toDate());
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    });
  }

  render() {
    return (
      <main className={'Main'}>
        <Section>
          <div />
          <div>
            <DateRange
              onChange={this.handleRangeChange.bind(this, 'dateRangePicker')}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              className={'PreviewArea'}
              months={2}
              ranges={[this.state.dateRangePicker.selection]}
              direction="horizontal"
              showTime={true}
              rangeColors={['#9be2e4']}
              color={'#9be2e4'}
              timezone={'America/New_York'}
            />
          </div>
        </Section>
      </main>
    );
  }
}
