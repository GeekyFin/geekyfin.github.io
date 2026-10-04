---
{"slug":"electricity","title":"Household Energy Analytics & Predictive Modelling","summary":"A Python and Streamlit study project combining household electricity use, EV charging and spot prices to explore contract choices, with additional forecasting experiments.","tags":["Python","Streamlit","Data analytics"],"order":2,"image":"images/electricity-overview.png","imageAlt":"Streamlit application overview showing the study assignments and analysis sections.","gallery":[{"image":"images/data_image.png","alt":"Data pipeline from EV charging, household consumption, spot prices, grid and weather data to Python, MySQL and Streamlit.","caption":"The data pipeline: multiple sources, Python-based preparation, a MySQL database and an interactive Streamlit report."},{"image":"images/electricity-models.png","alt":"Coursework results for linear regression, random forest, LSTM, feedforward neural network and XGBoost models.","caption":"Predictive modelling exercises using pedestrian and cyclist counts with weather data. XGBoost is a tree-based model; the original screenshot groups it under a neural-network heading."}],"link":"https://github.com/GeekyFin/dam","linkLabel":"Explore the project on GitHub"}
---
## The question:
What can my household’s electricity use and electric vehicle charging reveal about the most suitable electricity contract? During my data analytics studies, I used my own consumption data, contract terms and market spot prices to explore this question through an interactive report.

## My contribution:
I built a data pipeline and a Python / Streamlit application as a series of Data Analysis and Visualisation course assignments at Oulu University of Applied Sciences. I collected data, cleaned and transformed it, loaded it into a MySQL database on a CSC-hosted virtual machine, and created interactive analysis views.

I combined household consumption from Oulun Energia with Tesla charging data exported through Tessie and spot prices from electricity market data services. The wider coursework also included Fingrid electricity production and consumption data, Finnish Meteorological Institute weather observations, and City of Oulu pedestrian and cyclist counts.

## Electricity consumption & contract choices:
I visualised household electricity consumption, EV charging and spot prices to understand how my usage patterns affected costs. I used these observations to compare contract options and assess which type of contract would suit my existing consumption habits.

The focus was on making the analysis useful for a real household decision. Contract suitability depends on both the price structure and when electricity is used, including the timing of EV charging.

## Predictive modelling:
In a separate part of the coursework, I combined Oulu pedestrian and cyclist counts with local weather data to practise building and evaluating prediction models. I experimented with linear regression, random forests, feedforward neural networks, an LSTM recurrent neural network and XGBoost, a tree-based model.

I compared model outputs using mean absolute error (MAE), mean squared error (MSE) and R². The reported R² values were modest, highlighting the limits of the models and the importance of evaluating predictive performance. These were learning experiments, rather than validated forecasts for electricity prices or household savings.

## Findings & lessons:
The project connected the full analytics workflow: gathering data from several sources, preparing and storing it, building visualisations, and using the results to support a practical decision. It also helped me understand why a more complex prediction model does not automatically produce a better result.

Historical consumption and prices provide useful context for contract choices. Future costs still depend on market prices, contract terms and changes in household consumption, so any recommendation needs to be revisited as those conditions change.
