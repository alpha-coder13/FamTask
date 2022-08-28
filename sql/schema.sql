CREATE TABLE Details(
    etag VARCHAR(255) PRIMARY KEY,
    video_id VARCHAR(255),
    publish_date TIMESTAMP,
    video_details json
);