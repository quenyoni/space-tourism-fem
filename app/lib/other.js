!(function (t) {
	var o = (t.noise = {});
	function r(t, o, r) {
		(this.x = t), (this.y = o), (this.z = r);
	}
	(r.prototype.dot2 = function (t, o) {
		return this.x * t + this.y * o;
	}),
		(r.prototype.dot3 = function (t, o, r) {
			return this.x * t + this.y * o + this.z * r;
		});
	var n = [
			new r(1, 1, 0),
			new r(-1, 1, 0),
			new r(1, -1, 0),
			new r(-1, -1, 0),
			new r(1, 0, 1),
			new r(-1, 0, 1),
			new r(1, 0, -1),
			new r(-1, 0, -1),
			new r(0, 1, 1),
			new r(0, -1, 1),
			new r(0, 1, -1),
			new r(0, -1, -1),
		],
		e = [
			151, 160, 137, 91, 90, 15, 131, 13, 201, 95,
			96, 53, 194, 233, 7, 225, 140, 36, 103, 30,
			69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6,
			148, 247, 120, 234, 75, 0, 26, 197, 62, 94,
			252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
			88, 237, 149, 56, 87, 174, 20, 125, 136,
			171, 168, 68, 175, 74, 165, 71, 134, 139,
			48, 27, 166, 77, 146, 158, 231, 83, 111,
			229, 122, 60, 211, 133, 230, 220, 105, 92,
			41, 55, 46, 245, 40, 244, 102, 143, 54, 65,
			25, 63, 161, 1, 216, 80, 73, 209, 76, 132,
			187, 208, 89, 18, 169, 200, 196, 135, 130,
			116, 188, 159, 86, 164, 100, 109, 198, 173,
			186, 3, 64, 52, 217, 226, 250, 124, 123, 5,
			202, 38, 147, 118, 126, 255, 82, 85, 212,
			207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
			28, 42, 223, 183, 170, 213, 119, 248, 152,
			2, 44, 154, 163, 70, 221, 153, 101, 155,
			167, 43, 172, 9, 129, 22, 39, 253, 19, 98,
			108, 110, 79, 113, 224, 232, 178, 185, 112,
			104, 218, 246, 97, 228, 251, 34, 242, 193,
			238, 210, 144, 12, 191, 179, 162, 241, 81,
			51, 145, 235, 249, 14, 239, 107, 49, 192,
			214, 31, 181, 199, 106, 157, 184, 84, 204,
			176, 115, 121, 50, 45, 127, 4, 150, 254,
			138, 236, 205, 93, 222, 114, 67, 29, 24, 72,
			243, 141, 128, 195, 78, 66, 215, 61, 156,
			180,
		],
		a = new Array(512),
		i = new Array(512);
	(o.seed = function (t) {
		t > 0 && t < 1 && (t *= 65536),
			(t = Math.floor(t)) < 256 && (t |= t << 8);
		for (var o = 0; o < 256; o++) {
			var r;
			(r =
				1 & o
					? e[o] ^ (255 & t)
					: e[o] ^ ((t >> 8) & 255)),
				(a[o] = a[o + 256] = r),
				(i[o] = i[o + 256] = n[r % 12]);
		}
	}),
		o.seed(0);
	var d = 0.5 * (Math.sqrt(3) - 1),
		f = (3 - Math.sqrt(3)) / 6,
		h = 1 / 6;
	function u(t) {
		return t * t * t * (t * (6 * t - 15) + 10);
	}
	function s(t, o, r) {
		return (1 - r) * t + r * o;
	}
	(o.simplex2 = function (t, o) {
		var r,
			n,
			e = (t + o) * d,
			h = Math.floor(t + e),
			u = Math.floor(o + e),
			s = (h + u) * f,
			l = t - h + s,
			w = o - u + s;
		l > w
			? ((r = 1), (n = 0))
			: ((r = 0), (n = 1));
		var v = l - r + f,
			M = w - n + f,
			c = l - 1 + 2 * f,
			p = w - 1 + 2 * f,
			y = i[(h &= 255) + a[(u &= 255)]],
			x = i[h + r + a[u + n]],
			m = i[h + 1 + a[u + 1]],
			q = 0.5 - l * l - w * w,
			z = 0.5 - v * v - M * M,
			A = 0.5 - c * c - p * p;
		return (
			70 *
			((q < 0 ? 0 : (q *= q) * q * y.dot2(l, w)) +
				(z < 0
					? 0
					: (z *= z) * z * x.dot2(v, M)) +
				(A < 0 ? 0 : (A *= A) * A * m.dot2(c, p)))
		);
	}),
		(o.simplex3 = function (t, o, r) {
			var n,
				e,
				d,
				f,
				u,
				s,
				l = (t + o + r) * (1 / 3),
				w = Math.floor(t + l),
				v = Math.floor(o + l),
				M = Math.floor(r + l),
				c = (w + v + M) * h,
				p = t - w + c,
				y = o - v + c,
				x = r - M + c;
			p >= y
				? y >= x
					? ((n = 1),
					  (e = 0),
					  (d = 0),
					  (f = 1),
					  (u = 1),
					  (s = 0))
					: p >= x
					? ((n = 1),
					  (e = 0),
					  (d = 0),
					  (f = 1),
					  (u = 0),
					  (s = 1))
					: ((n = 0),
					  (e = 0),
					  (d = 1),
					  (f = 1),
					  (u = 0),
					  (s = 1))
				: y < x
				? ((n = 0),
				  (e = 0),
				  (d = 1),
				  (f = 0),
				  (u = 1),
				  (s = 1))
				: p < x
				? ((n = 0),
				  (e = 1),
				  (d = 0),
				  (f = 0),
				  (u = 1),
				  (s = 1))
				: ((n = 0),
				  (e = 1),
				  (d = 0),
				  (f = 1),
				  (u = 1),
				  (s = 0));
			var m = p - n + h,
				q = y - e + h,
				z = x - d + h,
				A = p - f + 2 * h,
				b = y - u + 2 * h,
				g = x - s + 2 * h,
				j = p - 1 + 0.5,
				k = y - 1 + 0.5,
				B = x - 1 + 0.5,
				C =
					i[
						(w &= 255) +
							a[(v &= 255) + a[(M &= 255)]]
					],
				D = i[w + n + a[v + e + a[M + d]]],
				E = i[w + f + a[v + u + a[M + s]]],
				F = i[w + 1 + a[v + 1 + a[M + 1]]],
				G = 0.6 - p * p - y * y - x * x,
				H = 0.6 - m * m - q * q - z * z,
				I = 0.6 - A * A - b * b - g * g,
				J = 0.6 - j * j - k * k - B * B;
			return (
				32 *
				((G < 0
					? 0
					: (G *= G) * G * C.dot3(p, y, x)) +
					(H < 0
						? 0
						: (H *= H) * H * D.dot3(m, q, z)) +
					(I < 0
						? 0
						: (I *= I) * I * E.dot3(A, b, g)) +
					(J < 0
						? 0
						: (J *= J) * J * F.dot3(j, k, B)))
			);
		}),
		(o.perlin2 = function (t, o) {
			var r = Math.floor(t),
				n = Math.floor(o);
			(t -= r), (o -= n);
			var e = i[(r &= 255) + a[(n &= 255)]].dot2(
					t,
					o,
				),
				d = i[r + a[n + 1]].dot2(t, o - 1),
				f = i[r + 1 + a[n]].dot2(t - 1, o),
				h = i[r + 1 + a[n + 1]].dot2(
					t - 1,
					o - 1,
				),
				l = u(t);
			return s(s(e, f, l), s(d, h, l), u(o));
		}),
		(o.perlin3 = function (t, o, r) {
			var n = Math.floor(t),
				e = Math.floor(o),
				d = Math.floor(r);
			(t -= n), (o -= e), (r -= d);
			var f = i[
					(n &= 255) +
						a[(e &= 255) + a[(d &= 255)]]
				].dot3(t, o, r),
				h = i[n + a[e + a[d + 1]]].dot3(
					t,
					o,
					r - 1,
				),
				l = i[n + a[e + 1 + a[d]]].dot3(
					t,
					o - 1,
					r,
				),
				w = i[n + a[e + 1 + a[d + 1]]].dot3(
					t,
					o - 1,
					r - 1,
				),
				v = i[n + 1 + a[e + a[d]]].dot3(
					t - 1,
					o,
					r,
				),
				M = i[n + 1 + a[e + a[d + 1]]].dot3(
					t - 1,
					o,
					r - 1,
				),
				c = i[n + 1 + a[e + 1 + a[d]]].dot3(
					t - 1,
					o - 1,
					r,
				),
				p = i[n + 1 + a[e + 1 + a[d + 1]]].dot3(
					t - 1,
					o - 1,
					r - 1,
				),
				y = u(t),
				x = u(o),
				m = u(r);
			return s(
				s(s(f, v, y), s(h, M, y), m),
				s(s(l, c, y), s(w, p, y), m),
				x,
			);
		});
})(this);
