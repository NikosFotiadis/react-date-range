import React, { Component } from 'react';
import { Calendar } from '../../../src';
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
      date: new Date(),
    };
  }

  handleChange(which, payload) {
    this.setState({
      [which]: payload,
    });
  }

  handleRangeChange(date) {
    this.setState({ date });
  }

  render() {
    return (
      <main className={'Main'}>
        <Section>
          <div />
          <div>
            <Calendar
              onChange={this.handleRangeChange.bind(this)}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              className={'PreviewArea'}
              direction="horizontal"
              showTime={true}
              rangeColors={['#9be2e4']}
              color={'#9be2e4'}
              timezone={'America/New_York'}
              date={this.state.date}
            />
          </div>
        </Section>
      </main>
    );
  }
}
