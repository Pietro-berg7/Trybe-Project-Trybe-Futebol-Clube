import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp from 'chai-http';

import { App } from '../app';
import { Model } from 'sequelize';

interface ITeam {
  id?: number;
  teamName: string;
}

const { expect } = chai;

chai.use(chaiHttp);

describe('Test route /teams', () => {
  const app = new App();

  afterEach(function () {
    sinon.restore();
  })

  it('Should return a array of teams on Get /teams', async() => {
    const outputMock: ITeam[] = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
    ];

    sinon.stub(Model, 'findAll').resolves();

    const response = await chai.request(app.app).get('/teams');

    expect(response.status).to.be.equal(200);

  });
});