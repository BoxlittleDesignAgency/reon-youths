import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom'
import TaskBox from './TaskBox';

const RightContent = ()=> (
<Fragment>
  <TaskBox/>
</Fragment>);


export default RightContent;