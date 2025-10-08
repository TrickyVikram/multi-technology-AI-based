package com.socket;

public class HelloMessage {

	private String name;

	public HelloMessage(String name) {
		super();
		this.name = name;
	}

	@Override
	public String toString() {
		return "HelloMessage [name=" + name + "]";
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
