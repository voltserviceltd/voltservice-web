C:\Users\Metal\AppData\Local\Google\Cloud SDK>gcloud run services list --project=voltservice-web --region=europe-west2
+
SERVICE: voltservice-web
REGION: europe-west2
URL: https://voltservice-web-1025280142621.europe-west2.run.app
LAST DEPLOYED BY: voltserviceltd-cloud-run-build@voltservice-web.iam.gserviceaccount.com
LAST DEPLOYED AT: 2026-08-02T14:01:07.807568Z

+
SERVICE: voltservice-web-git
REGION: europe-west2
URL: https://voltservice-web-git-1025280142621.europe-west2.run.app
LAST DEPLOYED BY: voltservice@metalbrain.net
LAST DEPLOYED AT: 2026-08-02T11:08:18.471787Z

C:\Users\Metal\AppData\Local\Google\Cloud SDK>gcloud run services describe voltservice-web --project=voltservice-web --region=europe-west2 --format="yaml(status.url, status.latestReadyRevisionName, spec.template.spec.containers[0].image, spec.template.metadata.annotations)"
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: '4'
        autoscaling.knative.dev/minScale: '1'
        run.googleapis.com/client-name: gcloud
        run.googleapis.com/client-version: 578.0.0
        run.googleapis.com/startup-cpu-boost: 'true'
    spec:
      containers:
      - image: europe-west2-docker.pkg.dev/voltservice-web/voltservice/voltservice-web:095a7fec7909eba4102600c87d9b955d9039a8db
status:
  latestReadyRevisionName: voltservice-web-00002-9zv
  url: https://voltservice-web-4k7ogxioga-nw.a.run.app

C:\Users\Metal\AppData\Local\Google\Cloud SDK>gcloud builds list --project=voltservice-web --region=europe-west2 --limit=5 --format="table(id,status,createTime,source.repoSource.branchName,images)"

C:\Users\Metal\AppData\Local\Google\Cloud SDK>


No Ops: gcloud builds list --project=voltservice-web --region=europe-west2 --limit=5 --format="table(id,status,createTime,source.repoSource.branchName,images)"
  Returns no result.