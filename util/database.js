import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";
import { data } from "../data/data";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.location.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          // console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * from places",
        [],
        (_, result) => {
          const places = [];
          for (const dp of result.rows._array) {
            places.push(
              new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],
        (_, result) => {
          const dp = result.rows._array[0];
          const place = new Place(
            dp.title,
            dp.imageUri,
            {
              address: dp.address,
              lat: dp.lat,
              lng: dp.lng,
            },
            dp.id
          );
          resolve(place);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function deletePlace(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM places WHERE id = ?",
        [id],
        (_, result) => {
          // console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function dropPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM places`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

// insert array of places from data file
export function populatePlace() {
  dropPlaces();
  data.forEach(async (item) => {
    let place = new Place(item.title, item.imageUri, item.location);
    await insertPlace(place);
  });
}
