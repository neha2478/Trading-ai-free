#This is Docker file
FROM python:3.10-slim

# 1) Install OS build deps & TA-Lib C library
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libta-lib0 \
      libta-lib-dev && \
    rm -rf /var/lib/apt/lists/*

# 2) Create app directory
WORKDIR /app

# 3) Copy & install Python deps
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 4) Copy source code
COPY . .

# 5) Launch FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
