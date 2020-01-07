import { any, bool, func, oneOfType } from 'prop-types';
import { isFunction } from 'lodash';

const If = ({ children, condition, render, otherwise }) => {
  const finalCondition = isFunction(condition)
    ? condition()
    : Boolean(condition);

  if (finalCondition) {
    return render ? render() : children;
  } else if (otherwise) {
    return otherwise();
  }

  return null;
};

If.propTypes = {
  condition: oneOfType([any, bool, func]),
  otherwise: func,
  render: func
};

export default If;
