.loader,
.loader:after {
  border-radius: 50%;
  width: 8em;
  height: 8em;
}
.loader-small { font-size: 5px; overflow: hidden; text-align: center;}
.loader-default { font-size: 10px; }
.loader, .loader-small, .loader-default {
  display: block;
  overflow: hidden;
  margin: 60px auto;
  position: relative;
  text-indent: -9999em;
  border-top: 0.9em solid rgba(200, 200, 200, 0.5);
  border-right: 0.9em solid rgba(200, 200, 200, 0.5);
  border-bottom: 0.9em solid rgba(200, 200, 200, 0.5);
  border-left: 0.9em solid #1974d2;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}