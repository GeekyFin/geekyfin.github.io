---
{"slug":"activity-recommender","title":"Personalised Activity Recommendations on Azure","summary":"An Azure proof of concept combining exercise history and weather data with XGBoost to suggest outdoor activities for the coming days.","tags":["Microsoft Azure","XGBoost","Python & Streamlit"],"order":3,"image":"images/activity-architecture.png","imageAlt":"Azure architecture connecting Polar exercise history and FMI weather data with Functions, SQL Database, Machine Learning, Blob Storage and a Docker-based Streamlit application.","gallery":[{"image":"images/activity-interface.png","alt":"Streamlit prototype showing weather forecasts and suggested outdoor activities by date.","caption":"The prototype interface from May 2025, showing forecast-based activity suggestions. Some recommendations illustrate the limitations of the model."},{"image":"images/activity-model-results.png","alt":"XGBoost classification results with approximately 47 percent accuracy, feature importance and identified model limitations.","caption":"Model evaluation from the June 2025 final report. The small, imbalanced dataset limited predictive accuracy."}]}
---
## The question:
Could activity suggestions based on exercise history and the weather help people find enjoyable ways to stay active? During my Data Analytics Case Study course in spring 2025, I explored this idea through a prototype recommending outdoor activities for the next five to seven days.

## My contribution:
I developed the concept locally, prepared the data and tested an XGBoost model before building the solution in Microsoft Azure. I also created a Streamlit interface and deployed it in a Docker container using Azure App Service.

The project gave me experience with the whole solution, from data collection and transformation to model training, recommendation generation and cloud deployment. I developed scripts and application code locally and used Azure CLI for deployment. I also used GPT-4o to support development.

## Data & environment architecture:
I combined exercise history exported as JSON from Polar Flow with historical weather observations and forecasts from the Finnish Meteorological Institute API. Python code in Azure Functions prepared and enriched the data, with Azure SQL Database storing the information needed for training and recommendations.

Azure Machine Learning provided the training environment. Blob Storage held the model and label files, and another Azure Function loaded these files to generate recommendations using forecast data. The Streamlit application displayed the resulting activity suggestions. The architecture diagram shows these services and their connections.

## Results & limitations:
I produced a working proof of concept demonstrating how exercise history, weather data and machine learning could be connected in a cloud application. The project did not establish whether the recommendations increased users’ motivation to exercise.

The reported XGBoost accuracy was approximately 47%. The small dataset, uneven representation of activity types and initial feature choices limited model performance. Further work would require more representative data, better features and evaluation of how useful the recommendations are in practice.

## Findings & lessons:
The project strengthened my understanding of how data quality and model design affect the usefulness of a solution. It also exposed practical challenges with weather data availability, database connectivity and Azure SQL performance.

I learned to consider operating costs alongside functionality. Database configuration and availability choices affected both reliability and expenditure, and cloud cost forecasts did not always reflect changes immediately. The final report recorded total Azure costs of €121.77 for 8 May–2 June 2025.

The result remained a learning prototype with a substantial development backlog. Its main value was the experience of designing, implementing and evaluating an integrated analytics environment.
