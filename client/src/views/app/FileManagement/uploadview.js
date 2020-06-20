/* eslint-disable */
import React, { Component, Fragment } from "react"
import Dialog from "./Dialog"
import { history } from "../../../helpers/history"

import {
  Row,
  InputGroup,
  InputGroupAddon,
  Button,
  CustomInput,
} from "reactstrap"
import { Colxx, Separator } from "../../../components/common/CustomBootstrap"
import $ from "jquery"

export default class uploadview extends Component {
  state = {
    isOpen: false,
  }

  componentDidMount() {
    $(document).ready(function () {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get("code")
      const redirect_uri = "http://localhost:3000/app/FileManagement/uploadview" // replace with your redirect_uri;
      const client_secret = "Q9feXMQIuju1Gv5rPQPYVbCG" // replace with your client secret
      const scope = "https://www.googleapis.com/auth/drive"
      var client_id =
        "254783341186-6kkeafblui7v0kpjcecsmm3dpmb3tadq.apps.googleusercontent.com" // replace it with your client id;

      $.ajax({
        type: "POST",
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {
          code: code,
          redirect_uri: redirect_uri,
          client_secret: client_secret,
          client_id: client_id,
          scope: scope,
          grant_type: "authorization_code",
        },
        dataType: "json",
        success: function (resultData) {
          localStorage.setItem("accessToken", resultData.access_token)
          localStorage.setItem("refreshToken", resultData.refreshToken)
          localStorage.setItem("expires_in", resultData.expires_in)
          window.history.pushState(
            {},
            document.title,
            "/GitLoginApp/upload.html"
          )
        },
      })

      var Upload = function (file) {
        this.file = file
      }

      Upload.prototype.getType = function () {
        localStorage.setItem("type", this.file.type)
        return this.file.type
      }
      Upload.prototype.getSize = function () {
        localStorage.setItem("size", this.file.size)
        return this.file.size
      }
      Upload.prototype.getName = function () {
        return this.file.name
      }
      Upload.prototype.doUpload = function () {
        var that = this
        var formData = new FormData()

        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName())
        formData.append("upload_file", true)

        $.ajax({
          type: "POST",
          beforeSend: function (request) {
            request.setRequestHeader(
              "Authorization",
              "Bearer " + localStorage.getItem("accessToken")
            )
          },
          url: "https://www.googleapis.com/upload/drive/v2/files",
          data: {
            uploadType: "media",
          },
          xhr: function () {
            var myXhr = $.ajaxSettings.xhr()
            if (myXhr.upload) {
              myXhr.upload.addEventListener(
                "progress",
                that.progressHandling,
                false
              )
            }
            return myXhr
          },
          success: function (data) {
            console.log(data)
          },
          error: function (error) {
            console.log(error)
          },
          async: true,
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          timeout: 60000,
        })
      }

      Upload.prototype.progressHandling = function (event) {
        var percent = 0
        var position = event.loaded || event.position
        var total = event.total
        var progress_bar_id = "#progress-wrp"
        if (event.lengthComputable) {
          percent = Math.ceil((position / total) * 100)
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%")
        $(progress_bar_id + " .status").text(percent + "%")
      }

      $("#upload").on("click", function (e) {
        var file = $("#files")[0].files[0]
        var upload = new Upload(file)

        // maby check size or type here with upload.getSize() and upload.getType()

        // execute upload
        upload.doUpload()

        setTimeout(() => {
          history.push("/app/FileManagement/Files")
        }, 1000)
      })
    })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Manage Files</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4"></Colxx>

          <Colxx xxs="12">
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <Button
                  outline
                  color="secondary"
                  id="upload"
                  onClick={(e) => this.setState({ isOpen: true })}
                >
                  Upload
                </Button>
              </InputGroupAddon>
              <CustomInput type="file" id="files" name="customFile" />
            </InputGroup>
          </Colxx>

          <Dialog
            isOpen={this.state.isOpen}
            onClose={(e) => this.setState({ isOpen: false })}
          >
            Upload successful{" "}
          </Dialog>
        </Row>
      </Fragment>
    )
  }
}

/*

  <Button 
                color="primary"
                size="xs"
                className="float-sm-right">
                 <input id="files" type="file" name="files[]" multiple/>
                </Button>
                </div>
               <div>
                <Button id="upload"
                color="primary"
                size="xs"
                className="float-sm-right">
                Upload
                </Button>


                */
