#This is Docker file
FROM python:3.10-slim
WORKDIR /app

# install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# copy source
COPY . .

# launch
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
