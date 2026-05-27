FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8103
CMD ["gunicorn", "-b", "0.0.0.0:8103", "app:app"]
