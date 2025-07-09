import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import pickle

np.random.seed(42)
n_samples = 1000

Current_Maths_result = np.random.uniform(0,100,n_samples)
Current_Hindi_result = np.random.uniform(0,100,n_samples)
Current_Gujrati_result = np.random.uniform(0,100,n_samples)
Current_English_result = np.random.uniform(0,100,n_samples)
Current_Science_result = np.random.uniform(0,100,n_samples)
Current_SocialScience_result = np.random.uniform(0,100,n_samples)
Current_Nine_Result = np.random.uniform(0,100,n_samples)
Current_PAT = np.random.uniform(0,30,n_samples)
Current_SAT = np.random.uniform(0,30,n_samples)
Current_attendence = np.random.uniform(0,100,n_samples)
Ten_result = np.random.uniform(0,100,n_samples)
Predicated_attendence = np.random.uniform(0,100,n_samples)
Predicated_PAT = np.random.uniform(0,30,n_samples)
Predicated_SAT = np.random.uniform(0,30,n_samples)

Current_Maths_result = np.random.uniform(0,100,n_samples)
Current_Physics_result = np.random.uniform(0,100,n_samples)
Current_Chemistry_result = np.random.uniform(0,100,n_samples)
Current_English_result = np.random.uniform(0,100,n_samples)
Current_ComputerScience_result = np.random.uniform(0,100,n_samples)
Current_Eleventh_Result = np.random.uniform(0,100,n_samples)
Current_PAT = np.random.uniform(0,30,n_samples)
Current_SAT = np.random.uniform(0,30,n_samples)
Current_attendence = np.random.uniform(0,100,n_samples)
Twelve_result = np.random.uniform(0,100,n_samples)
Predicated_attendence = np.random.uniform(0,100,n_samples)
Predicated_PAT = np.random.uniform(0,30,n_samples)
Predicated_SAT = np.random.uniform(0,30,n_samples)

df1 = pd.DataFrame({
    "Current_Maths_result": Current_Maths_result,
    "Current_Physics_result": Current_Physics_result,
    "Current_Chemistry_result": Current_Chemistry_result,
    "Current_English_result": Current_English_result ,
    "Current_ComputerScience_result": Current_ComputerScience_result,
    "Current_Eleventh_Result": Current_Eleventh_Result,
    "Current_PAT":Current_PAT ,
    "Current_SAT":Current_SAT ,
    "Current_attendence": Current_attendence, 
    "Twelve_result": Twelve_result,
    "Predicated_attendence": Predicated_attendence,
    "Predicated_PAT": Predicated_PAT,
    "Predicated_SAT": Predicated_SAT
})

df = pd.DataFrame({
    "Current_Maths_result": Current_Maths_result,
    "Current_Hindi_result": Current_Hindi_result,
    "Current_Gujrati_result": Current_Gujrati_result,
    "Current_English_result": Current_English_result ,
    "Current_Science_result": Current_Science_result,
    "Current_SocialScience_result": Current_SocialScience_result,
    "Current_Nine_Result": Current_Nine_Result,
    "Current_PAT":Current_PAT ,
    "Current_SAT":Current_SAT ,
    "Current_attendence": Current_attendence, 
    "Ten_result": Ten_result,
    "Predicated_attendence": Predicated_attendence,
    "Predicated_PAT": Predicated_PAT,
    "Predicated_SAT": Predicated_SAT
})

X1 = df1.drop(columns=['Twelve_result','Predicated_attendence','Predicated_PAT','Predicated_SAT'])
y1 = df1[['Twelve_result','Predicated_attendence','Predicated_PAT','Predicated_SAT']]

X = df.drop(columns=['Ten_result','Predicated_attendence','Predicated_PAT','Predicated_SAT'])
y = df[['Ten_result','Predicated_attendence','Predicated_PAT','Predicated_SAT']]

X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,random_state=42)
X1_train, X1_test, y1_train, y1_test = train_test_split(X1,y1,test_size=0.2,random_state=42)

rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train,y_train)
rf_pred_train = rf.predict(X_train)
rf_pred_test = rf.predict(X_test)

rf1 = RandomForestRegressor(n_estimators=100, random_state=42)
rf1.fit(X1_train,y1_train)
rf1_pred_train = rf1.predict(X1_train)
rf1_pred_test = rf1.predict(X1_test)

xgb = XGBRegressor(n_estimators=100, random_state=42)
xgb.fit(X_train, y_train)
xgb_pred_train = xgb.predict(X_train)
xgb_pred_test = xgb.predict(X_test)

xgb1 = XGBRegressor(n_estimators=100, random_state=42)
xgb1.fit(X1_train, y1_train)
xgb1_pred_train = xgb1.predict(X1_train)
xgb1_pred_test = xgb1.predict(X1_test)

stacked_train = np.column_stack((rf_pred_train, xgb_pred_train))
stacked_test = np.column_stack((rf_pred_test, xgb_pred_test))

stacked1_train = np.column_stack((rf1_pred_train, xgb1_pred_train))
stacked1_test = np.column_stack((rf1_pred_test, xgb1_pred_test))

meta_model = LinearRegression()
meta_model.fit(stacked_train, y_train)

meta1_model = LinearRegression()
meta1_model.fit(stacked1_train, y1_train)

pickle.dump(meta_model,open('model.pkl','wb'))