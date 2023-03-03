lazy var view__F80_1v_rM9: UIView = {
	let view = UIView()
	view.contentMode = .scaleAspectFill
	view.translatesAutoresizingMaskIntoConstraints = false
	return view
}()

lazy var statusLabel: UILabel = {
	let label = UILabel()
	label.contentMode = .center
	label.text = "Comece o jogo"
	label.textAlignment = .center
	label.lineBreakMode = .byTruncatingTail
	label.numberOfLines = 0
	label.baselineAdjustment = .alignBaselines
	label.adjustsFontSizeToFitWidth = false
	label.translatesAutoresizingMaskIntoConstraints = false
	label.font = .systemFont(ofSize: 28)
	return label
}()

lazy var resetButton: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPurple
	button.titleLabel?.font = .systemFont(ofSize: 23)
	button.setTitle("Resetar jogo", for: .normal)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()

lazy var b0: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPink
	button.titleLabel?.font = .systemFont(ofSize: 40)
	button.setTitle(" ", for: .normal)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()

lazy var b1: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPink
	button.titleLabel?.font = .systemFont(ofSize: 40)
	button.setTitle(" ", for: .normal)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()

lazy var b2: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPink
	button.titleLabel?.font = .systemFont(ofSize: 40)
	button.setTitle(" ", for: .normal)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()

lazy var b3: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPink
	button.titleLabel?.font = .systemFont(ofSize: 40)
	button.setTitle(" ", for: .normal)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()

lazy var b4: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPink
	button.titleLabel?.font = .systemFont(ofSize: 40)
	button.setTitle(" ", for: .normal)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()

lazy var b5: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPink
	button.titleLabel?.font = .systemFont(ofSize: 40)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()

lazy var b6: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPink
	button.titleLabel?.font = .systemFont(ofSize: 40)
	button.setTitle(" ", for: .normal)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()

lazy var b7: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPink
	button.titleLabel?.font = .systemFont(ofSize: 40)
	button.setTitle(" ", for: .normal)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()

lazy var b8: UIButton = {
	let button = UIButton()
	button.contentMode = .scaleToFill
	button.contentHorizontalAlignment = .center
	button.contentVerticalAlignment = .center
	button.translatesAutoresizingMaskIntoConstraints = false
	button.backgroundColor = .systemPink
	button.titleLabel?.font = .systemFont(ofSize: 40)
	button.setTitle(" ", for: .normal)
	button.normal(UIColor(cgColor: CGColor(genericGrayGamma2_2Gray: 1, alpha: 1)), for: .normal)
	return button
}()


----------------------------
view__F80_1v_rM9.addSubview(b0)
view__F80_1v_rM9.addSubview(b1)
view__F80_1v_rM9.addSubview(b2)
view__F80_1v_rM9.addSubview(b3)
view__F80_1v_rM9.addSubview(b4)
view__F80_1v_rM9.addSubview(b5)
view__F80_1v_rM9.addSubview(b6)
view__F80_1v_rM9.addSubview(b7)
view__F80_1v_rM9.addSubview(b8)
view.addSubview(view__F80_1v_rM9)
view.addSubview(statusLabel)
view.addSubview(resetButton)

----------------------------
NSLayoutConstraint.activate([
	b4.topAnchor.constraint(equalTo: b1.bottomAnchor, constant: 10),
	b1.widthAnchor.constraint(equalTo: b0.widthAnchor),
	b4.widthAnchor.constraint(equalTo: b0.widthAnchor),
	b1.leadingAnchor.constraint(equalTo: b0.trailingAnchor, constant: 10),
	view__F80_1v_rM9.trailingAnchor.constraint(equalTo: b2.trailingAnchor, constant: 10),
	b6.leadingAnchor.constraint(equalTo: view__F80_1v_rM9.leadingAnchor, constant: 10),
	b6.heightAnchor.constraint(equalTo: b0.heightAnchor),
	b6.topAnchor.constraint(equalTo: b3.bottomAnchor, constant: 10),
	b3.topAnchor.constraint(equalTo: b0.bottomAnchor, constant: 10),
	view__F80_1v_rM9.bottomAnchor.constraint(equalTo: b6.bottomAnchor, constant: 10),
	b1.heightAnchor.constraint(equalTo: b0.heightAnchor),
	b3.heightAnchor.constraint(equalTo: b0.heightAnchor),
	b2.widthAnchor.constraint(equalTo: b0.widthAnchor),
	b0.leadingAnchor.constraint(equalTo: view__F80_1v_rM9.leadingAnchor, constant: 10),
	view__F80_1v_rM9.trailingAnchor.constraint(equalTo: b8.trailingAnchor, constant: 10),
	b1.topAnchor.constraint(equalTo: view__F80_1v_rM9.topAnchor, constant: 10),
	b6.widthAnchor.constraint(equalTo: b0.widthAnchor),
	b7.leadingAnchor.constraint(equalTo: b6.trailingAnchor, constant: 10),
	b2.heightAnchor.constraint(equalTo: b0.heightAnchor),
	b0.topAnchor.constraint(equalTo: view__F80_1v_rM9.topAnchor, constant: 10),
	b5.topAnchor.constraint(equalTo: b2.bottomAnchor, constant: 10),
	b2.topAnchor.constraint(equalTo: view__F80_1v_rM9.topAnchor, constant: 10),
	b5.leadingAnchor.constraint(equalTo: b4.trailingAnchor, constant: 10),
	b8.widthAnchor.constraint(equalTo: b0.widthAnchor),
	b4.leadingAnchor.constraint(equalTo: b3.trailingAnchor, constant: 10),
	b2.leadingAnchor.constraint(equalTo: b1.trailingAnchor, constant: 10),
	b7.topAnchor.constraint(equalTo: b4.bottomAnchor, constant: 10),
	b3.leadingAnchor.constraint(equalTo: view__F80_1v_rM9.leadingAnchor, constant: 10),
	view__F80_1v_rM9.bottomAnchor.constraint(equalTo: b8.bottomAnchor, constant: 10),
	b8.topAnchor.constraint(equalTo: b5.bottomAnchor, constant: 10),
	b7.heightAnchor.constraint(equalTo: b0.heightAnchor),
	view__F80_1v_rM9.widthAnchor.constraint(equalTo: view__F80_1v_rM9.heightAnchor, multiplier: 1/1),
	b5.heightAnchor.constraint(equalTo: b0.heightAnchor),
	b7.widthAnchor.constraint(equalTo: b0.widthAnchor),
	view__F80_1v_rM9.trailingAnchor.constraint(equalTo: b5.trailingAnchor, constant: 10),
	b4.heightAnchor.constraint(equalTo: b0.heightAnchor),
	b8.heightAnchor.constraint(equalTo: b0.heightAnchor),
	view__F80_1v_rM9.bottomAnchor.constraint(equalTo: b7.bottomAnchor, constant: 10),
	b3.widthAnchor.constraint(equalTo: b0.widthAnchor),
	b8.leadingAnchor.constraint(equalTo: b7.trailingAnchor, constant: 10),
	b5.widthAnchor.constraint(equalTo: b0.widthAnchor),
])
NSLayoutConstraint.activate([
	statusLabel.widthAnchor.constraint(equalTo: statusLabel.heightAnchor, multiplier: 10/2),
])
NSLayoutConstraint.activate([
	resetButton.widthAnchor.constraint(equalTo: resetButton.heightAnchor, multiplier: 100/20),
])
NSLayoutConstraint.activate([
	view__F80_1v_rM9.centerXAnchor.constraint(equalTo: view.centerXAnchor),
	view.safeAreaLayoutGuide.trailingAnchor.constraint(equalTo: view__F80_1v_rM9.trailingAnchor),
	resetButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
	view.safeAreaLayoutGuide.trailingAnchor.constraint(equalTo: resetButton.trailingAnchor, constant: 50),
	statusLabel.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 30),
	view__F80_1v_rM9.topAnchor.constraint(equalTo: statusLabel.bottomAnchor, constant: 30),
	resetButton.topAnchor.constraint(equalTo: view__F80_1v_rM9.bottomAnchor, constant: 30),
	view__F80_1v_rM9.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor),
	view__F80_1v_rM9.centerYAnchor.constraint(equalTo: view.centerYAnchor),
	resetButton.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 50),
	view.safeAreaLayoutGuide.trailingAnchor.constraint(equalTo: statusLabel.trailingAnchor, constant: 30),
	statusLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
])
