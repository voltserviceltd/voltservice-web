creationTimestamp: '2026-08-17T09:33:47.828-07:00'
description: WAF policy for voltservice-web
fingerprint: s4IwkG8ZH8s=
id: '4976226949860854020'
kind: compute#securityPolicy
labelFingerprint: 42WmSpB8rSM=
name: voltservice-web-armor-policy
rules:
- action: allow
  description: default rule
  kind: compute#securityPolicyRule
  match:
    config:
      srcIpRanges:
      - '*'
    versionedExpr: SRC_IPS_V1
  preview: false
  priority: 2147483647
selfLink: https://www.googleapis.com/compute/v1/projects/voltservice-web/global/securityPolicies/voltservice-web-armor-policy
type: CLOUD_ARMOR