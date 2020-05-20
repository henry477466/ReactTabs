(this['webpackJsonpreact-blank-app'] =
  this['webpackJsonpreact-blank-app'] || []).push([
  [0],
  {
    41: function(e, t, n) {
      e.exports = n(88);
    },
    46: function(e, t, n) {},
    47: function(e, t, n) {},
    87: function(e, t, n) {},
    88: function(e, t, n) {
      'use strict';
      n.r(t);
      var a = n(6),
        o = n.n(a),
        i = n(37),
        l = n.n(i),
        c = (n(46), n(2)),
        r = n(3),
        u = n(21),
        d = n(19),
        s = (n(47), n(38)),
        p = (n(87),
        (function(e) {
          Object(u.a)(n, e);
          var t = Object(d.a)(n);
          function n(e) {
            var a;
            return (
              Object(c.a)(this, n),
              ((a = t.call(this, e)).initReader = function() {
                var e = a.props,
                  t = e.localFile,
                  n = e.epubLoadEd;
                (a.book = new s.a()),
                  a.book
                    .open(t)
                    .then(function() {
                      (a.rendition = a.book.renderTo(a.viewerRef, {
                        width: '100%',
                        height: '100%',
                        flow: 'paginated',
                        manager: 'continuous',
                        snap: !0,
                      })),
                        a.book.ready.then(function(e) {
                          var t = e.toc;
                          a.setState({toc: t}), n(t), a.rendition.display();
                        });
                    })
                    .catch(function(e) {
                      alert(e.message);
                    });
              }),
              (a.prevPage = function() {
                a.rendition.prev(),
                  console.log(a.rendition.location.start.index);
              }),
              (a.nextPage = function() {
                a.rendition.themes.register({p: {color: 'purple'}}),
                  a.rendition.next(),
                  console.log(a.rendition.location.start.index);
              }),
              (a.state = {
                toc: [],
                themeList: [
                  {
                    name: 'default',
                    style: {body: {color: '#000', background: '#fff'}},
                  },
                ],
              }),
              (a.book = null),
              (a.rendition = null),
              (a.themes = null),
              a
            );
          }
          return (
            Object(r.a)(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.initReader();
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this;
                  return o.a.createElement(
                    'div',
                    {className: 'viewHolder'},
                    o.a.createElement('div', {
                      className: 'view',
                      ref: function(t) {
                        return (e.viewerRef = t);
                      },
                    }),
                  );
                },
              },
            ]),
            n
          );
        })(a.Component)),
        f = (function(e) {
          Object(u.a)(n, e);
          var t = Object(d.a)(n);
          function n(e) {
            var a;
            return (
              Object(c.a)(this, n),
              ((a = t.call(this, e)).epubLoadEd = function(e) {
                a.setState({toc: e, loaded: !0});
              }),
              (a.state = {
                loaded: !1,
                toc: [],
                localFile: null,
                localName: null,
              }),
              a
            );
          }
          return (
            Object(r.a)(n, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.setState({
                    localFile:
                      'file:///data/user/0/com.cjread/files/epub/1.epub',
                    localName: '\u56fe\u4e66\u540d\u5b57',
                  });
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this.state,
                    t = (e.toc, e.localFile),
                    n = (e.localName, e.loaded);
                  return o.a.createElement(
                    'div',
                    {className: 'App'},
                    o.a.createElement(
                      'div',
                      {className: 'book-root'},
                      o.a.createElement(
                        'div',
                        {className: 'book-border'},
                        t
                          ? o.a.createElement(p, {
                              localFile: t,
                              epubLoadEd: this.epubLoadEd,
                            })
                          : null,
                      ),
                    ),
                    o.a.createElement(
                      'div',
                      {className: 'file-loading '.concat(n ? 'hide' : '')},
                      o.a.createElement('p', null, 'Loading Book ...'),
                    ),
                  );
                },
              },
            ]),
            n
          );
        })(o.a.Component);
      l.a.render(
        o.a.createElement(o.a.StrictMode, null, o.a.createElement(f, null)),
        document.getElementById('root'),
      );
    },
  },
  [[41, 1, 2]],
]);
