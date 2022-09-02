import React from 'react';
import * as Icons from 'react-icons/md';
import * as AIIcons from 'react-icons/ai';

export const DynamicMDIcon = ({ name, className, onClick, style }) => {
  const IconComponent = Icons[name];

  if(!IconComponent){ return <Icons.MdHomeFilled className={className} onClick={onClick} style={style} />; }
  return <IconComponent className={className} onClick={onClick} style={style} />;
};

export const DynamicAIIcon = ({ name, className, onClick, style }) => {
  const IconComponent = AIIcons[name];

  if(!IconComponent){ return <AIIcons.AiFillHome className={className} onClick={onClick} style={style} />; }
  return <IconComponent className={className} onClick={onClick} style={style} />;
};