/* ========================================
   Samsung Libya — script.js
   ======================================== */

function toggleMenu() {
  var m = document.getElementById('mobile-menu');
  var b = document.getElementById('nav-toggle');
  m.classList.toggle('active');
  b.textContent = m.classList.contains('active') ? '✕' : '☰';
}

function closeMenu() {
  var m = document.getElementById('mobile-menu');
  var b = document.getElementById('nav-toggle');
  if (m) m.classList.remove('active');
  if (b) b.textContent = '☰';
}

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar: تغيير الخلفية عند التمرير ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(255,255,255,0.98)';
      nav.style.boxShadow  = '0 2px 20px rgba(0,0,0,0.08)';
    } else {
      nav.style.background = 'rgba(255,255,255,0.92)';
      nav.style.boxShadow  = 'none';
    }
  });

  /* ── زر الاشتراك في النشرة البريدية ── */
  const subscribeBtn = document.querySelector('.newsletter-box button');
  const emailInput   = document.querySelector('.newsletter-box input[type="email"]');

  if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', () => {
      const email = emailInput.value.trim();
      if (!email || !email.includes('@')) {
        emailInput.style.borderColor = '#dc2626';
        emailInput.focus();
        return;
      }
      emailInput.style.borderColor = '#16a34a';
      subscribeBtn.textContent = '✓ تم الاشتراك!';
      subscribeBtn.disabled    = true;
      subscribeBtn.style.background = '#16a34a';
      emailInput.value = '';
      setTimeout(() => {
        subscribeBtn.textContent  = 'اشترك';
        subscribeBtn.disabled     = false;
        subscribeBtn.style.background = '';
        emailInput.style.borderColor  = '';
      }, 3000);
    });
  }

  /* ── أزرار "اشتر الآن" ── */
  document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const title = btn.closest('.product-card')?.querySelector('.card-title')?.textContent ?? 'المنتج';
      btn.textContent = '✓ أُضيف';
      btn.style.background = '#16a34a';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'اشتر الآن';
        btn.style.background = '';
        btn.style.color = '';
      }, 1800);
    });
  });

  /* ── زر "أضف إلى السلة" في المنتج المميز ── */
  const featuredBtn = document.querySelector('.featured-info .btn-primary');
  if (featuredBtn) {
    featuredBtn.addEventListener('click', e => {
      e.preventDefault();
      featuredBtn.textContent = '✓ أُضيف إلى السلة';
      featuredBtn.style.background = '#16a34a';
      setTimeout(() => {
        featuredBtn.textContent = 'أضف إلى السلة';
        featuredBtn.style.background = '';
      }, 2000);
    });
  }

});

/* ── فلترة المنتجات ── */
function filterProducts(cat) {
  // تفعيل الزر النشط
  document.querySelectorAll('.filter-tab').forEach(btn => btn.classList.remove('filter-tab-active'));
  event.target.classList.add('filter-tab-active');

  // إظهار/إخفاء المنتجات
  document.querySelectorAll('.product-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ── السلة ── */
let cartCount = 0;

function toggleCart() {
  // مستقبلاً يمكن فتح drawer للسلة
}

function updateCartCount() {
  cartCount++;
  const badge = document.getElementById('cart-count');
  badge.textContent = cartCount;
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 200);
}

// ربط زر "اشتر الآن" بالعداد
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', () => updateCartCount());
  });
  const featuredBtn = document.querySelector('.featured-info .btn-primary');
  if (featuredBtn) featuredBtn.addEventListener('click', () => updateCartCount());
});
