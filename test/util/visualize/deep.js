import { expect } from 'chai';

import { toRadians, toCartesian } from '../../../src/util/visualize/deep';

describe('depth based visualization', () => {
  const a = 1e-9;

  describe('toRadians(degrees: Number)', () => {
    it('converts zero degree', () => {
      expect(toRadians(0)).to.equal(0);
    });

    it('converts positive degrees', () => {
      expect(toRadians(11.25)).to.equal(Math.PI / 16);
      expect(toRadians(22.5)).to.equal(Math.PI / 8);
      expect(toRadians(30)).to.equal(Math.PI / 6);
      expect(toRadians(45)).to.equal(Math.PI / 4);
      expect(toRadians(60)).to.equal(Math.PI / 3);
      expect(toRadians(90)).to.equal(Math.PI / 2);
      expect(toRadians(180)).to.equal(Math.PI);
      expect(toRadians(210)).to.be.within(7 * Math.PI / 6 - a, 7 * Math.PI / 6 + a);
      expect(toRadians(270)).to.equal(3 * Math.PI / 2);
    });

    it('converts negative degrees', () => {
      expect(toRadians(-11.25)).to.equal(-Math.PI / 16);
      expect(toRadians(-22.5)).to.equal(-Math.PI / 8);
      expect(toRadians(-30)).to.equal(-Math.PI / 6);
      expect(toRadians(-45)).to.equal(-Math.PI / 4);
      expect(toRadians(-60)).to.equal(-Math.PI / 3);
      expect(toRadians(-90)).to.equal(-Math.PI / 2);
      expect(toRadians(-180)).to.equal(-Math.PI);
      expect(toRadians(-210)).to.be.within(-7 * Math.PI / 6 - a, -7 * Math.PI / 6 + a);
      expect(toRadians(-270)).to.equal(-3 * Math.PI / 2);
    });
  });

  describe('toCartesian(phi: Number, rho: Number)', () => {
    describe('with rho = 0', () => {
      it('converts phi = 0, rho = 10', () => {
        const phi = toRadians(0), rho = 0;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(-a, a);
      });

      it('converts phi > 0, rho = 10', () => {
        const phi = toRadians(90), rho = 0;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(-a, a);
      });

      it('converts phi < 0, rho = 10', () => {
        const phi = toRadians(-90), rho = 0;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(-a, a);
      });
    });

    describe('with phi = 0, rho > 0', () => {
      it('converts phi = 0, rho = 10', () => {
        const phi = toRadians(0), rho = 10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(10 - a, 10 + a);
        expect(cartes.y).to.be.within(-a, a);
      });
    });

    describe('with phi > 0, rho > 0', () => {
      it('converts phi = 90 degrees, rho = 10', () => {
        const phi = toRadians(90), rho = 10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(10 - a, 10 + a);
      });

      it('converts phi = 180 degrees, rho = 10', () => {
        const phi = toRadians(180), rho = 10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-10 - a, -10 + a);
        expect(cartes.y).to.be.within(-a, a);
      });

      it('converts phi = 270 degrees, rho = 10', () => {
        const phi = toRadians(270), rho = 10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(-10 - a, -10 + a);
      });

      it('converts phi = 360 degrees, rho = 10', () => {
        const phi = toRadians(360), rho = 10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(10 - a, 10 + a);
        expect(cartes.y).to.be.within(-a, a);
      });
    });

    describe('with phi > 0, rho < 0', () => {
      it('converts phi = 90 degrees, rho = -10', () => {
        const phi = toRadians(90), rho = -10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(-10 - a, -10 + a);
      });

      it('converts phi = 180 degrees, rho = -10', () => {
        const phi = toRadians(180), rho = -10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(10 - a, 10 + a);
        expect(cartes.y).to.be.within(-a, a);
      });

      it('converts phi = 270 degrees, rho = -10', () => {
        const phi = toRadians(270), rho = -10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(10 - a, 10 + a);
      });

      it('converts phi = 360 degrees, rho = -10', () => {
        const phi = toRadians(360), rho = -10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-10 - a, -10 + a);
        expect(cartes.y).to.be.within(-a, a);
      });
    });

    describe('with phi < 0, rho > 0', () => {
      it('converts phi = -90 degrees, rho = 10', () => {
        const phi = toRadians(-90), rho = 10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(-10 - a, -10 + a);
      });

      it('converts phi = -180 degrees, rho = 10', () => {
        const phi = toRadians(-180), rho = 10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-10 - a, -10 + a);
        expect(cartes.y).to.be.within(-a, a);
      });

      it('converts phi = -270 degrees, rho = 10', () => {
        const phi = toRadians(-270), rho = 10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(10 - a, 10 + a);
      });

      it('converts phi = -360 degrees, rho = 10', () => {
        const phi = toRadians(-360), rho = 10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(10 - a, 10 + a);
        expect(cartes.y).to.be.within(-a, a);
      });
    });

    describe('with phi < 0, rho < 0', () => {
      it('converts phi = -90 degrees, rho = -10', () => {
        const phi = toRadians(-90), rho = -10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(10 - a, 10 + a);
      });

      it('converts phi = -180 degrees, rho = -10', () => {
        const phi = toRadians(-180), rho = -10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(10 - a, 10 + a);
        expect(cartes.y).to.be.within(-a, a);
      });

      it('converts phi = -270 degrees, rho = -10', () => {
        const phi = toRadians(-270), rho = -10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-a, a);
        expect(cartes.y).to.be.within(-10 - a, -10 + a);
      });

      it('converts phi = -360 degrees, rho = -10', () => {
        const phi = toRadians(-360), rho = -10;
        const cartes = toCartesian(phi, rho);
        expect(cartes.x).to.be.within(-10 - a, -10 + a);
        expect(cartes.y).to.be.within(-a, a);
      });
    });
  });

  describe('getCoordinates()', () => {

  });
});
