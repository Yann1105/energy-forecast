from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from tensorflow import keras
import json
import numpy as np
import pickle
import os

# predictions Function
def make_prediction(model, X, scaler=None, features=1):
    if X.ndim == 2:
        X = X.reshape((X.shape[0], X.shape[1], features))
    elif X.ndim != 3:
        raise ValueError("Input data must be 2D or 3D.")
    predictions = model.predict(X)
    if scaler is not None:
        predictions = scaler.inverse_transform(predictions)
    return predictions.flatten()

def load_model(model_path):
    with open(model_path, 'rb') as f:
        final_model = pickle.load(f)

        # Read model object
        model = final_model['model']
        scaler = final_model['scaler']
        look_back_window = final_model['look_back']

    return model, scaler,look_back_window

# Last preview 24 data 
def previewData():
    return np.array([223.33333333333334, 91.66666666666667, 76.66666666666667, 70.0, 65.0, 60.0, 58.333333333333336,
                    50.0, 58.333333333333336,  58.333333333333336,  58.333333333333336,  63.333333333333336,  111.66666666666667,
                    130.0,251.66666666666666,251.66666666666666,310.0,185.0,265.0,101.66666666666667,76.66666666666667,135.0,
                    180.0,430.0])

# Prediction View
@api_view(['POST'])
def EnergypredictionAPIView(request):
    print(request.data)
    if request.method == 'POST':
        results = []
        

        # Hours to predict data
        hours = request.data.get("hours")
        print(hours)

        if hours is None:
            raise exceptions.ParseError("No hours provided.")
        hours = int(hours)

        # Load model and scaler
        final_model_path = os.path.join(os.path.dirname(__file__), 'aiModel/final_model.pkl')

        model, scaler,look_back_window = load_model(final_model_path)

        #  Last look_back_window hours data
        past_hours_data  = previewData()

         # Ensure past_hours_data has at least look_back_window data points
        if len(past_hours_data) < look_back_window:
            raise exceptions.ParseError("Insufficient past data for prediction.")
        
        # Reshape data to fit the model requirements
        new_data_reshaped= past_hours_data.reshape(-1, 1)
        new_data_scaled  = scaler.transform(new_data_reshaped)

        # Data send to the model 
        input_sequence   = new_data_scaled[-look_back_window:, :]

        # Make predictions for the specified number of hours
        for _ in range(hours):
            predictions      = make_prediction(model, input_sequence, scaler)
        
            # Append the predicted value to results
            results.append(predictions[0])
            # Scale the prediction and append it to the input data
            prediction_data_scaled = scaler.transform(np.array([[predictions[0]]]))
            new_data_scaled = np.concatenate((new_data_scaled, prediction_data_scaled), axis=0)
            # Update the input sequence
            input_sequence = new_data_scaled[-look_back_window:, :]
        
        return Response({"predictions": results}, status=status.HTTP_200_OK)
    return Response({"error": "Invalid request method"}, status=status.HTTP_400_BAD_REQUEST)

        
