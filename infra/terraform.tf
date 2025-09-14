provider "aws" { region = "us-east-1" }

data "aws_caller_identity" "current" {}

locals {
  mime_types = {
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".ico"  = "image/vnd.microsoft.icon"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
  }
}


variable "hosted_zone_id" {}
variable "aws_region" { default = "us-east-1" }
variable "s3_bucket" {}

resource "aws_s3_bucket" "react_apps" {
  bucket = var.s3_bucket
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.react_apps.id

  block_public_acls       = true
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = false
}


resource "aws_s3_bucket_policy" "public_policy" {
  bucket = aws_s3_bucket.react_apps.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = ["s3:GetObject"]
        Resource  = "${aws_s3_bucket.react_apps.arn}/troncoso/*"
      }
    ]
  })
}

resource "aws_s3_object" "provision_source_files" {
  bucket   = var.s3_bucket
  for_each = fileset("../dist/", "**")

  key          = "troncoso/${each.value}"
  source       = "../dist/${each.value}"
  etag         = filemd5("../dist/${each.value}") # Ensures updates on file content changes
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)

}



resource "aws_cloudfront_distribution" "react_apps" {

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "React app ${aws_s3_bucket.react_apps.bucket} distribution"
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.react_apps.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.react_apps.id
    origin_path = "/troncoso"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  custom_error_response {
    error_code            = 403
    response_page_path    = "/index.html"
    response_code         = 200
    error_caching_min_ttl = 300
  }


  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.react_apps.id


    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}


output "cloudfront_urls" {
  value = "https://${aws_cloudfront_distribution.react_apps.domain_name}"
}
