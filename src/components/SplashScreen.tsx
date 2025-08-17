import React from "react";

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 splash-gradient rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">SC</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Setshaba Connect</h1>
        <p className="text-muted-foreground">Professional Community Management</p>
        <div className="mt-6">
          <div className="w-8 h-8 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};