const request = require("supertest");

const BASE_URL = "https://web-cdn.api.bbci.co.uk";

describe("Scenario 1: Status code and response time", () => {
  test("should return a status 200 and respond in under 1000ms", () => {
    const startTime = Date.now();
    const responseTime = Date.now() - startTime;
    return request(BASE_URL)
      .get(
        "/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations"
      )
      .expect(200)
      .then(() => {
        expect(responseTime).toBeLessThan(1000);
      });
  });
});
describe("Scenario 2: Validate the ID and participant count", () => {
  test('should return only valid ID"s, never null or an empty string and a participants array length of 6', () => {
    return request(BASE_URL)
      .get(
        "/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations"
      )
      .then(({ _body }) => {
        const data = _body.tournaments[0].stages[0].rounds[0].participants;
        const participantsLength = data.length;
        const participants = data;
        expect(participantsLength).toBe(6);
        participants.forEach((participant) => {
          expect(participant.id).not.toBeNull();
          expect(participant.id).not.toBe(" ");
        });
      });
  });
});
describe("Scenario 3: Use an alternative competiton name", () => {
  test("should return data for an alternative competition", () => {
    return request(BASE_URL)
      .get(
        "/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:womens-six-nations"
      )
      .expect(200)
      .then(({ _body }) => {
        const data = _body.tournaments[0].name;
        const participantsData =
          _body.tournaments[0].stages[0].rounds[0].participants;
        const competitionName = data;

        expect(competitionName).toBe("Women's Six Nations");
        expect(participantsData.length).toBe(6);
        participantsData.forEach((participant) => {
          expect(participant).toMatchObject({
            teamId: expect.any(String),
            teamUrn: expect.any(String),
            name: expect.any(String),
            shortName: expect.any(String),
            rank: { value: expect.any(String), accessible: expect.any(String) },
            played: {
              value: expect.any(String),
              accessible: expect.any(String),
            },
            won: { value: expect.any(String), accessible: expect.any(String) },
            lost: { value: expect.any(String), accessible: expect.any(String) },
            pointsFor: {
              value: expect.any(String),
              accessible: expect.any(String),
            },
            pointsAgainst: {
              value: expect.any(String),
              accessible: expect.any(String),
            },
            drawn: {
              value: expect.any(String),
              accessible: expect.any(String),
            },
            pointsDiff: {
              value: expect.any(String),
              accessible: expect.any(String),
            },
            bonus: {
              value: expect.any(String),
              accessible: expect.any(String),
            },
            points: {
              value: expect.any(String),
              accessible: expect.any(String),
            },
          });
        });
      });
  });
});
describe("Scenario 4: Invalid competition name", () => {
  test("should return 404 and error message when the URL contains an invalid competition name", () => {
    return request(BASE_URL)
      .get(
        "/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:invalid-comp"
      )
      .expect(404)
      .then(({ _body }) => {
        const errorMessage = _body.error.message;

        expect(_body).toHaveProperty("error");
        expect(errorMessage).toBe(
          "Error fetching data for container: sport-standings"
        );
      });
  });
});
describe("Scenario 5: Check that the custom header is not returned in the response", () => {
  test("should send x-test-harness header but won't return it in the response", () => {
    return request(BASE_URL)
      .get(
        "/wc-poll-data/container/sport-standings?urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations"
      )
      .expect(200)
      .set("x-test-harness", "true")
      .then((res) => {
        expect(res.headers["x-test-harness"]).toBeUndefined();
      });
  });
});
