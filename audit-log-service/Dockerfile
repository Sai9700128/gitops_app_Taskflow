FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o /service main.go


FROM alpine:3.19

RUN apk --no-cache add ca-certificates

COPY --from=builder /service /service

EXPOSE 8091

CMD ["/service"]
