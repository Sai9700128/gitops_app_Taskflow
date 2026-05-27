FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8104
CMD ["gunicorn", "-b", "0.0.0.0:8104", "app:app"]
