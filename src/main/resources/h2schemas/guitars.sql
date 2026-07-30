CREATE TABLE guitars
(
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    brand               VARCHAR(255),
    model               VARCHAR(255),
    launchYear          INTEGER,
    mostFamousUser      VARCHAR(255),
    primaryColor        VARCHAR(255),
    colorOrFinish       VARCHAR(255),
    guitarType          VARCHAR(255),
    countryOfOrigin     VARCHAR(255),
    pickupConfiguration VARCHAR(255),
    bodyWood            VARCHAR(255),
    neckConstruction    VARCHAR(255),
    status              VARCHAR(255)
);