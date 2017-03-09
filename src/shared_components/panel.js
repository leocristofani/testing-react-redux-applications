import React, { PropTypes } from 'react';

export default function Panel({ title, children }) {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">{title}</div>
        </div>
        <div className="panel-body">
          {children}
        </div>
      </div>
    );
}

Panel.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};