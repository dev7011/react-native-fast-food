import React from 'react';
import {Tabs} from "expo-router";

const _AuthLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="sign_in"
      />
    </Tabs>
  );
};

export default _AuthLayout;
