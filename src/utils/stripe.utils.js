import {loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  "pk_test_51KGkmQKikdAxC8GOVuQvbeW1NkoJ8ntSSMCQIbUh7dQbecrSIzVLiMmBVpNfiSlxSowQ9zBge4WVuIkNV38KQWiA00BqPZy7qz"
);