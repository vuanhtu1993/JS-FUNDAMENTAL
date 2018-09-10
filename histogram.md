clear
figure(1);
f = imread('test.png');
imshow(f, []);
[H, W] = size(f);
x = 10;
y = 20;
g = f(1: x, 1: y);

L = max(f());
M = 128;
delta = round(L - 1 /M)
h = reros(M + 1, 1); //cap phat mang h cho M
for x = 1 : H
	for y = 1 : W
		n = f(x, y);
		index = round(n/delta) + 1;
		h(index) = h(index) + 1;
	end
end
%%
h1 = imhist(f, M);
%%
figure(2);
%stem(h);
subplot(121); % khoi tao frame co 1 hang 2 cot va chon hien thi tren cot 1 truoc
stem(h); title('my hist');
subplot(122); % khoi tao frame co 1 hang 2 cot va chon hien thi tren cot 2 truoc
stem(h1); title('matlab hist');
